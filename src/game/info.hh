#ifndef TIBIA_INFO_HH_
#define TIBIA_INFO_HH_ 1

#include <vector>
#include "common.hh"
#include "map.hh"

const char *GetLiquidName(int LiquidType);
uint8 GetLiquidColor(int LiquidType);
uint8 GetClientLiquid(int LiquidType);
bool HasItemDuration(ObjectType Type);
int GetItemDuration(Object Obj);

enum BonusKind: int {
	BONUS_NONE		= 0,
	BONUS_ATTACK	= 1,
	BONUS_ARMOR		= 2,
	BONUS_AMULET	= 3,
	BONUS_MAGIC		= 4,
	BONUS_WAND		= 5,
	BONUS_DISTANCE	= 6,
	BONUS_DEFENSE	= 7,
};

int GetBonusKind(ObjectType Type);
int GetObjectBonus(Object Obj, int Kind);
int GetMagicLevelBonus(uint32 CreatureID);
void RollLootBonus(Object Obj);
std::vector<int> GetItemDurationTypes(void);
ObjectType GetVialType(void);
ObjectType GetFilledVialType(int LiquidType);
int GetFilledVialLiquid(ObjectType Type);
const char *GetName(Object Obj);
const char *GetInfo(Object Obj);
int GetWeight(Object Obj, int Count);
int GetCompleteWeight(Object Obj);
int GetRowWeight(Object Obj);
uint32 GetObjectCreatureID(Object Obj);
int GetObjectBodyPosition(Object Obj);
int GetObjectRNum(Object Obj);
bool ObjectInRange(uint32 CreatureID, Object Obj, int Range);
bool ObjectAccessible(uint32 CreatureID, Object Obj, int Range);
int ObjectDistance(Object Obj1, Object Obj2);
Object GetBodyContainer(uint32 CreatureID, int Position);
Object GetBodyObject(uint32 CreatureID, int Position);
Object GetTopObject(int x, int y, int z, bool Move);
Object GetContainer(uint32 CreatureID, int x, int y, int z);
Object GetObject(uint32 CreatureID, int x, int y, int z, int RNum, ObjectType Type);
Object GetRowObject(Object Obj, ObjectType Type, uint32 Value, bool Recurse);
Object GetInventoryObject(uint32 CreatureID, ObjectType Type, uint32 Value);
Object GetHotkeyObject(uint32 CreatureID, ObjectType Type, uint32 Value);
int CountHotkeyObjects(uint32 CreatureID, ObjectType Type, uint32 Value);
bool IsHeldByContainer(Object Obj, Object Con);
int CountObjectsInContainer(Object Con);
int CountObjects(Object Obj);
int CountObjects(Object Obj, ObjectType Type, uint32 Value);
int CountInventoryObjects(uint32 CreatureID, ObjectType Type, uint32 Value);
int CountMoney(Object Obj);
int CountInventoryMoney(uint32 CreatureID);
void CalculateChange(int Amount, int *Gold, int *Platinum, int *Crystal);
int GetHeight(int x, int y, int z);
bool JumpPossible(int x, int y, int z, bool AvoidPlayers);
bool FieldPossible(int x, int y, int z, int FieldType);
bool SearchFreeField(int *x, int *y, int *z, int Distance, uint16 HouseID, bool Jump);
bool SearchLoginField(int *x, int *y, int *z, int Distance, bool Player);
bool SearchSpawnField(int *x, int *y, int *z, int Distance, bool Player);
bool SearchFlightField(uint32 FugitiveID, uint32 PursuerID, int *x, int *y, int *z);
bool SearchSummonField(int *x, int *y, int *z, int Distance);
bool ThrowPossible(int OrigX, int OrigY, int OrigZ,
			int DestX, int DestY, int DestZ, int Power);
void GetCreatureLight(uint32 CreatureID, int *Brightness, int *Color);
int GetInventoryWeight(uint32 CreatureID);
bool CheckRight(uint32 CharacterID, RIGHT Right);
bool CheckBanishmentRight(uint32 CharacterID, int Reason, int Action);
const char *GetBanishmentReason(int Reason);
void InitInfo(void);
void ExitInfo(void);

#endif //TIBIA_INFO_HH_
