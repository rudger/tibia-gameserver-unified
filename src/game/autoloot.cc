// NOTE(rudger): Auto loot (auto_loot). Players keep a list of rules "item name
// -> backpack name". When "Auto Loot on" is set and a player opens a corpse,
// the objects of the list are moved into the chosen backpacks first. The list
// is kept per character next to the player file (usr/XX/<id>.loot).

#include "cr.hh"
#include "config.hh"
#include "connections.hh"
#include "info.hh"
#include "operate.hh"

#include <algorithm>
#include <cctype>
#include <map>
#include <string>
#include <vector>

static std::map<uint32, TAutoLoot> AutoLoots;
static std::map<std::string, std::vector<int>> ObjectTypesByName;
static bool ObjectTypesByNameLoaded = false;

// NOTE(rudger): All colored bags and backpacks are called "a bag" and "a
// backpack", so they are also known by their color.
static const struct {
	int TypeID;
	const char *Name;
} ContainerColors[] = {
	{2853, "brown bag"},		{2854, "brown backpack"},
	{2857, "green bag"},		{2865, "green backpack"},
	{2858, "yellow bag"},		{2866, "yellow backpack"},
	{2859, "red bag"},			{2867, "red backpack"},
	{2860, "purple bag"},		{2868, "purple backpack"},
	{2861, "blue bag"},			{2869, "blue backpack"},
	{2862, "grey bag"},			{2870, "grey backpack"},
	{2862, "gray bag"},			{2870, "gray backpack"},
	{2863, "golden bag"},		{2871, "golden backpack"},
	{2863, "gold bag"},			{2871, "gold backpack"},
	{2864, "camouflage bag"},	{2872, "camouflage backpack"},
};

static std::string NormalizeName(const char *Name){
	std::string Result;
	for(const char *p = Name; *p != 0; p += 1){
		Result += (char)tolower((unsigned char)*p);
	}

	size_t Start = Result.find_first_not_of(" \t");
	size_t End = Result.find_last_not_of(" \t");
	if(Start == std::string::npos){
		return "";
	}
	Result = Result.substr(Start, End - Start + 1);

	for(const char *Article: {"a ", "an ", "the "}){
		size_t Length = strlen(Article);
		if(Result.compare(0, Length, Article) == 0){
			Result = Result.substr(Length);
			break;
		}
	}
	return Result;
}

static void LoadObjectTypesByName(void){
	ObjectTypesByNameLoaded = true;
	for(int TypeID = 100; ObjectTypeExists(TypeID); TypeID += 1){
		ObjectType Type(TypeID);
		if(Type.isCreatureContainer() || !Type.getFlag(TAKE)){
			continue;
		}
		ObjectTypesByName[NormalizeName(Type.getName(1))].push_back(TypeID);
	}
}

// NOTE(rudger): The object types with a name ("wand of inferno", also with
// "a"/"an" or a plural "s").
static const std::vector<int> *FindObjectTypes(const std::string &Name){
	if(!ObjectTypesByNameLoaded){
		LoadObjectTypesByName();
	}

	auto It = ObjectTypesByName.find(Name);
	if(It == ObjectTypesByName.end() && Name.size() > 1 && Name.back() == 's'){
		It = ObjectTypesByName.find(Name.substr(0, Name.size() - 1));
	}
	return (It != ObjectTypesByName.end() ? &It->second : NULL);
}

static std::vector<int> FindContainerTypes(const std::string &Name){
	std::vector<int> Result;
	for(const auto &Color: ContainerColors){
		if(Name == Color.Name){
			Result.push_back(Color.TypeID);
			return Result;
		}
	}

	// NOTE(rudger): "bag" and "backpack" are the brown ones, not every color.
	if(Name == "bag" || Name == "bags"){
		Result.push_back(2853);
		return Result;
	}else if(Name == "backpack" || Name == "backpacks"){
		Result.push_back(2854);
		return Result;
	}

	const std::vector<int> *Types = FindObjectTypes(Name);
	if(Types != NULL){
		for(int TypeID: *Types){
			if(ObjectType(TypeID).getFlag(CONTAINER)){
				Result.push_back(TypeID);
			}
		}
	}
	return Result;
}

static std::string CapitalizeWords(std::string Name){
	bool Start = true;
	for(char &c: Name){
		if(Start){
			c = (char)toupper((unsigned char)c);
		}
		Start = (c == ' ');
	}
	return Name;
}

static void AutoLootPath(char *Buffer, int BufferSize, uint32 CharacterID){
	snprintf(Buffer, BufferSize, "%s/%02u/%u.loot",
			USERPATH, (CharacterID % 100), CharacterID);
}

TAutoLoot *GetAutoLoot(uint32 CharacterID){
	TAutoLoot *AutoLoot = &AutoLoots[CharacterID];
	if(AutoLoot->Loaded){
		return AutoLoot;
	}

	AutoLoot->Loaded = true;
	char FileName[4096];
	AutoLootPath(FileName, sizeof(FileName), CharacterID);
	FILE *File = fopen(FileName, "r");
	if(File == NULL){
		return AutoLoot;
	}

	char Line[512];
	while(fgets(Line, sizeof(Line), File) != NULL){
		Line[strcspn(Line, "\r\n")] = 0;
		if(strncmp(Line, "on=", 3) == 0){
			AutoLoot->On = (atoi(Line + 3) != 0);
		}else if(strncmp(Line, "fallback=", 9) == 0){
			AutoLoot->Fallback = (atoi(Line + 9) != 0);
		}else if(strncmp(Line, "rule=", 5) == 0){
			char *Separator = strchr(Line + 5, '|');
			if(Separator != NULL && (int)AutoLoot->Rules.size() < MAX_AUTOLOOT_RULES){
				*Separator = 0;
				AutoLoot->Rules.push_back({Line + 5, Separator + 1});
			}
		}
	}
	fclose(File);
	return AutoLoot;
}

static void SaveAutoLoot(uint32 CharacterID, TAutoLoot *AutoLoot){
	char FileName[4096];
	AutoLootPath(FileName, sizeof(FileName), CharacterID);
	FILE *File = fopen(FileName, "w");
	if(File == NULL){
		error("SaveAutoLoot: Kann Datei %s nicht anlegen.\n", FileName);
		return;
	}

	fprintf(File, "on=%d\n", AutoLoot->On ? 1 : 0);
	fprintf(File, "fallback=%d\n", AutoLoot->Fallback ? 1 : 0);
	for(const TAutoLootRule &Rule: AutoLoot->Rules){
		fprintf(File, "rule=%s|%s\n", Rule.Item.c_str(), Rule.Backpack.c_str());
	}
	fclose(File);
}

void GetAutoLootRuleInfo(const TAutoLootRule &Rule, int *ItemType, std::string *ItemName,
		int *BackpackType, std::string *BackpackName){
	const std::vector<int> *Types = FindObjectTypes(Rule.Item);
	*ItemType = (Types != NULL ? ObjectType(Types->front()).getDisguise().TypeID : 0);
	*ItemName = CapitalizeWords(Rule.Item);

	std::vector<int> Containers = FindContainerTypes(Rule.Backpack);
	*BackpackType = (!Containers.empty() ? Containers.front() : 0);
	*BackpackName = CapitalizeWords(Rule.Backpack);
}

void AutoLootAddRule(TPlayer *Player, const char *Item, const char *Backpack){
	if(!AutoLootEnabled || Player == NULL || Player->Connection == NULL){
		return;
	}

	TAutoLoot *AutoLoot = GetAutoLoot(Player->ID);
	std::string ItemName = NormalizeName(Item);
	std::string BackpackName = NormalizeName(Backpack);
	if(ItemName.empty() || BackpackName.empty()){
		SendMessage(Player->Connection, TALK_FAILURE_MESSAGE, "Enter an item name and a backpack name.");
		return;
	}

	if(FindObjectTypes(ItemName) == NULL){
		SendMessage(Player->Connection, TALK_FAILURE_MESSAGE, "There is no item called \"%s\".", ItemName.c_str());
		return;
	}

	if(FindContainerTypes(BackpackName).empty()){
		SendMessage(Player->Connection, TALK_FAILURE_MESSAGE, "\"%s\" is not a backpack or bag.", BackpackName.c_str());
		return;
	}

	// NOTE(rudger): The same item again only changes its backpack.
	for(TAutoLootRule &Rule: AutoLoot->Rules){
		if(Rule.Item == ItemName){
			Rule.Backpack = BackpackName;
			SaveAutoLoot(Player->ID, AutoLoot);
			SendAutoLootList(Player->Connection, AutoLoot);
			return;
		}
	}

	if((int)AutoLoot->Rules.size() >= MAX_AUTOLOOT_RULES){
		SendMessage(Player->Connection, TALK_FAILURE_MESSAGE, "You can not add more than %d items.", MAX_AUTOLOOT_RULES);
		return;
	}

	AutoLoot->Rules.push_back({ItemName, BackpackName});
	SaveAutoLoot(Player->ID, AutoLoot);
	SendAutoLootList(Player->Connection, AutoLoot);
}

void AutoLootRemoveRule(TPlayer *Player, int Index){
	if(!AutoLootEnabled || Player == NULL || Player->Connection == NULL){
		return;
	}

	TAutoLoot *AutoLoot = GetAutoLoot(Player->ID);
	if(Index >= 0 && Index < (int)AutoLoot->Rules.size()){
		AutoLoot->Rules.erase(AutoLoot->Rules.begin() + Index);
		SaveAutoLoot(Player->ID, AutoLoot);
	}
	SendAutoLootList(Player->Connection, AutoLoot);
}

void AutoLootSetSettings(TPlayer *Player, bool On, bool Fallback){
	if(!AutoLootEnabled || Player == NULL || Player->Connection == NULL){
		return;
	}

	TAutoLoot *AutoLoot = GetAutoLoot(Player->ID);
	AutoLoot->On = On;
	AutoLoot->Fallback = Fallback;
	SaveAutoLoot(Player->ID, AutoLoot);
	SendAutoLootList(Player->Connection, AutoLoot);
}

void AutoLootSendList(TPlayer *Player){
	if(!AutoLootEnabled || Player == NULL || Player->Connection == NULL){
		return;
	}
	SendAutoLootList(Player->Connection, GetAutoLoot(Player->ID));
}

// NOTE(rudger): The first container of one of the types in the inventory,
// also inside other containers.
static Object FindInventoryContainer(Object Obj, const std::vector<int> &Types, int Depth){
	while(Obj != NONE && Depth < 10){
		ObjectType Type = Obj.getObjectType();
		if(Type.getFlag(CONTAINER)){
			if(std::find(Types.begin(), Types.end(), Type.TypeID) != Types.end()){
				return Obj;
			}

			Object Found = FindInventoryContainer(GetFirstContainerObject(Obj), Types, Depth + 1);
			if(Found != NONE){
				return Found;
			}
		}
		Obj = Obj.getNextObject();
	}
	return NONE;
}

static Object FindLootContainer(TPlayer *Player, const std::vector<int> &Types){
	for(int Position = INVENTORY_FIRST; Position <= INVENTORY_LAST; Position += 1){
		Object BodyObj = GetBodyObject(Player->ID, Position);
		if(BodyObj == NONE){
			continue;
		}

		ObjectType Type = BodyObj.getObjectType();
		if(!Type.getFlag(CONTAINER)){
			continue;
		}

		if(std::find(Types.begin(), Types.end(), Type.TypeID) != Types.end()){
			return BodyObj;
		}

		Object Found = FindInventoryContainer(GetFirstContainerObject(BodyObj), Types, 1);
		if(Found != NONE){
			return Found;
		}
	}
	return NONE;
}

static const TAutoLootRule *FindRule(TAutoLoot *AutoLoot, ObjectType Type){
	for(const TAutoLootRule &Rule: AutoLoot->Rules){
		const std::vector<int> *Types = FindObjectTypes(Rule.Item);
		if(Types != NULL && std::find(Types->begin(), Types->end(), Type.TypeID) != Types->end()){
			return &Rule;
		}
	}
	return NULL;
}

static void CollectLoot(TAutoLoot *AutoLoot, Object Obj, std::vector<Object> *Loot, int Depth){
	while(Obj != NONE && Depth < 10){
		ObjectType Type = Obj.getObjectType();
		if(FindRule(AutoLoot, Type) != NULL){
			Loot->push_back(Obj);
		}else if(Type.getFlag(CONTAINER)){
			CollectLoot(AutoLoot, GetFirstContainerObject(Obj), Loot, Depth + 1);
		}
		Obj = Obj.getNextObject();
	}
}

// NOTE(rudger): Why an object could not be looted.
enum LootFailure: int {
	LOOT_DONE			= 0,
	LOOT_FULL			= 1,
	LOOT_CAPACITY		= 2,
	LOOT_NO_BACKPACK	= 3,
};

static int MoveLoot(TPlayer *Player, Object Obj, Object Con){
	if(Con == NONE){
		return LOOT_NO_BACKPACK;
	}

	try{
		Move(Player->ID, Obj, Con, -1, false, NONE);
		return LOOT_DONE;
	}catch(RESULT r){
		return (r == TOOHEAVY ? LOOT_CAPACITY : LOOT_FULL);
	}
}

// NOTE(rudger): Orange text over the own character (like monster talk), only
// for this player.
static void SendLootFailure(TPlayer *Player, const std::vector<std::string> &Names, const char *Reason){
	if(Names.empty()){
		return;
	}

	std::string Text = "Auto Loot: Can't loot ";
	int Shown = std::min<int>((int)Names.size(), 3);
	for(int i = 0; i < Shown; i += 1){
		if(i > 0){
			Text += ", ";
		}
		Text += Names[i];
	}

	if((int)Names.size() > Shown){
		Text += " and " + std::to_string(Names.size() - Shown) + " more";
	}

	Text += " (";
	Text += Reason;
	Text += ").";
	SendTalk(Player->Connection, 0, "", TALK_ANIMAL_LOW,
			Player->posx, Player->posy, Player->posz, Text.c_str());
}

void AutoLootCorpse(TPlayer *Player, Object Corpse){
	if(!AutoLootEnabled || Player == NULL || Player->Connection == NULL || !Corpse.exists()){
		return;
	}

	TAutoLoot *AutoLoot = GetAutoLoot(Player->ID);
	if(!AutoLoot->On || AutoLoot->Rules.empty()){
		return;
	}

	std::vector<Object> Loot;
	CollectLoot(AutoLoot, GetFirstContainerObject(Corpse), &Loot, 0);

	// NOTE(rudger): Nothing is said when it works, only what could not be
	// looted and why. The objects stay in the corpse.
	std::vector<std::string> Full, Capacity, NoBackpack;
	for(Object Obj: Loot){
		if(!Obj.exists()){
			continue;
		}

		ObjectType Type = Obj.getObjectType();
		const TAutoLootRule *Rule = FindRule(AutoLoot, Type);
		if(Rule == NULL){
			continue;
		}

		int Amount = (Type.getFlag(CUMULATIVE) ? (int)Obj.getAttribute(AMOUNT) : 1);
		std::string Name = Type.getName(Amount);

		Object Con = FindLootContainer(Player, FindContainerTypes(Rule->Backpack));
		int Result = MoveLoot(Player, Obj, Con);
		if(Result != LOOT_DONE && AutoLoot->Fallback){
			Object Main = GetBodyObject(Player->ID, INVENTORY_BAG);
			if(Main != NONE && Main != Con && Main.getObjectType().getFlag(CONTAINER)){
				Result = MoveLoot(Player, Obj, Main);
			}
		}

		if(Result == LOOT_FULL){
			Full.push_back(Name);
		}else if(Result == LOOT_CAPACITY){
			Capacity.push_back(Name);
		}else if(Result == LOOT_NO_BACKPACK){
			NoBackpack.push_back(Name);
		}
	}

	SendLootFailure(Player, Capacity, "no capacity");
	SendLootFailure(Player, Full, "backpack is full");
	SendLootFailure(Player, NoBackpack, "backpack not found");
}
