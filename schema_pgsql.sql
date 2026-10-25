-- ==============================================================================
-- Tibia CipSoft 7.72 Server Schema for PostgreSQL
-- ==============================================================================

-- 1. Patches
CREATE TABLE IF NOT EXISTS Patches (
	FileName VARCHAR(255) NOT NULL,
	Timestamp BIGINT NOT NULL,
	PRIMARY KEY (FileName)
);

-- 2. Worlds
CREATE TABLE IF NOT EXISTS Worlds (
	WorldID INT NOT NULL,
	Name VARCHAR(64) NOT NULL,
	Type INT NOT NULL DEFAULT 0,
	RebootTime INT NOT NULL DEFAULT 5,
	Host VARCHAR(128) NOT NULL DEFAULT '127.0.0.1',
	Port INT NOT NULL DEFAULT 7172,
	MaxPlayers INT NOT NULL DEFAULT 1000,
	PremiumPlayerBuffer INT NOT NULL DEFAULT 100,
	MaxNewbies INT NOT NULL DEFAULT 300,
	PremiumNewbieBuffer INT NOT NULL DEFAULT 100,
	OnlinePeak INT NOT NULL DEFAULT 0,
	OnlinePeakTimestamp BIGINT NOT NULL DEFAULT 0,
	LastStartup BIGINT NOT NULL DEFAULT 0,
	LastShutdown BIGINT NOT NULL DEFAULT 0,
	PRIMARY KEY (WorldID),
	CONSTRAINT uk_world_name UNIQUE (Name)
);

-- 3. Accounts
CREATE TABLE IF NOT EXISTS Accounts (
	AccountID INT NOT NULL,
	Email VARCHAR(255) NOT NULL,
	Auth BYTEA NOT NULL,
	PremiumEnd BIGINT NOT NULL DEFAULT 0,
	PendingPremiumDays INT NOT NULL DEFAULT 0,
	Deleted SMALLINT NOT NULL DEFAULT 0,
	PRIMARY KEY (AccountID),
	CONSTRAINT uk_account_email UNIQUE (Email)
);

-- 4. Characters
CREATE TABLE IF NOT EXISTS Characters (
	WorldID INT NOT NULL DEFAULT 1,
	CharacterID SERIAL,
	AccountID INT NOT NULL,
	Name VARCHAR(64) NOT NULL,
	Sex SMALLINT NOT NULL DEFAULT 1,
	Level INT NOT NULL DEFAULT 1,
	Profession VARCHAR(32) NOT NULL DEFAULT '',
	Residence VARCHAR(64) NOT NULL DEFAULT 'Thais',
	LastLoginTime BIGINT NOT NULL DEFAULT 0,
	TutorActivities INT NOT NULL DEFAULT 0,
	IsOnline SMALLINT NOT NULL DEFAULT 0,
	Deleted SMALLINT NOT NULL DEFAULT 0,
	PRIMARY KEY (CharacterID),
	CONSTRAINT uk_character_name UNIQUE (Name)
);
CREATE INDEX IF NOT EXISTS idx_characters_world ON Characters (WorldID, IsOnline);
CREATE INDEX IF NOT EXISTS idx_characters_account ON Characters (AccountID, IsOnline);

-- 5. Character Rights
CREATE TABLE IF NOT EXISTS CharacterRights (
	CharacterID INT NOT NULL,
	Name VARCHAR(64) NOT NULL,
	PRIMARY KEY (CharacterID, Name)
);

-- 6. Character Deaths
CREATE TABLE IF NOT EXISTS CharacterDeaths (
	DeathID SERIAL,
	CharacterID INT NOT NULL,
	Level INT NOT NULL,
	OffenderID INT NOT NULL,
	Remark VARCHAR(255) NOT NULL DEFAULT '',
	Unjustified SMALLINT NOT NULL DEFAULT 0,
	Timestamp BIGINT NOT NULL,
	PRIMARY KEY (DeathID)
);
CREATE INDEX IF NOT EXISTS idx_deaths_character ON CharacterDeaths (CharacterID, Timestamp);
CREATE INDEX IF NOT EXISTS idx_deaths_offender ON CharacterDeaths (OffenderID, Timestamp);
CREATE INDEX IF NOT EXISTS idx_deaths_time ON CharacterDeaths (Timestamp);

-- 7. Buddies (VIP List)
CREATE TABLE IF NOT EXISTS Buddies (
	WorldID INT NOT NULL DEFAULT 1,
	AccountID INT NOT NULL,
	BuddyID INT NOT NULL,
	PRIMARY KEY (WorldID, AccountID, BuddyID)
);

-- 8. World Invitations
CREATE TABLE IF NOT EXISTS WorldInvitations (
	WorldID INT NOT NULL,
	CharacterID INT NOT NULL,
	PRIMARY KEY (WorldID, CharacterID)
);

-- 9. Login Attempts
CREATE TABLE IF NOT EXISTS LoginAttempts (
	AccountID INT NOT NULL,
	IPAddress INT NOT NULL,
	Timestamp BIGINT NOT NULL,
	Failed SMALLINT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_login_account ON LoginAttempts (AccountID, Timestamp);

-- 10. Houses
CREATE TABLE IF NOT EXISTS Houses (
	WorldID INT NOT NULL DEFAULT 1,
	HouseID INT NOT NULL,
	OwnerID INT NOT NULL DEFAULT 0,
	PaidUntil BIGINT NOT NULL DEFAULT 0,
	PRIMARY KEY (WorldID, HouseID)
);

-- 11. Kill Statistics
CREATE TABLE IF NOT EXISTS KillStatistics (
	WorldID INT NOT NULL DEFAULT 1,
	RaceName VARCHAR(64) NOT NULL,
	KilledPlayers INT NOT NULL DEFAULT 0,
	KilledCreatures INT NOT NULL DEFAULT 0,
	Timestamp BIGINT NOT NULL,
	PRIMARY KEY (WorldID, RaceName, Timestamp)
);

-- 12. Player State & Spawn
CREATE TABLE IF NOT EXISTS PlayerState (
	CharacterID INT NOT NULL,
	Race INT NOT NULL DEFAULT 0,
	Profession INT NOT NULL DEFAULT 0,
	OrigLookType INT NOT NULL DEFAULT 128,
	OrigLookHead INT NOT NULL DEFAULT 0,
	OrigLookBody INT NOT NULL DEFAULT 0,
	OrigLookLegs INT NOT NULL DEFAULT 0,
	OrigLookFeet INT NOT NULL DEFAULT 0,
	CurrLookType INT NOT NULL DEFAULT 128,
	CurrLookHead INT NOT NULL DEFAULT 0,
	CurrLookBody INT NOT NULL DEFAULT 0,
	CurrLookLegs INT NOT NULL DEFAULT 0,
	CurrLookFeet INT NOT NULL DEFAULT 0,
	StartX INT NOT NULL DEFAULT 0,
	StartY INT NOT NULL DEFAULT 0,
	StartZ INT NOT NULL DEFAULT 0,
	PosX INT NOT NULL DEFAULT 0,
	PosY INT NOT NULL DEFAULT 0,
	PosZ INT NOT NULL DEFAULT 0,
	PlayerkillerEnd INT NOT NULL DEFAULT 0,
	Spells BYTEA NULL,
	Quests BYTEA NULL,
	Murders BYTEA NULL,
	PRIMARY KEY (CharacterID),
	FOREIGN KEY (CharacterID) REFERENCES Characters (CharacterID) ON DELETE CASCADE
);

-- 13. Player Skills & Attributes
CREATE TABLE IF NOT EXISTS PlayerSkills (
	CharacterID INT NOT NULL,
	SkillID SMALLINT NOT NULL,
	Actual INT NOT NULL DEFAULT 0,
	Maximum INT NOT NULL DEFAULT 0,
	Minimum INT NOT NULL DEFAULT 0,
	DeltaAct INT NOT NULL DEFAULT 0,
	MagicDeltaAct INT NOT NULL DEFAULT 0,
	Cycle INT NOT NULL DEFAULT 0,
	MaxCycle INT NOT NULL DEFAULT 0,
	Count INT NOT NULL DEFAULT 0,
	MaxCount INT NOT NULL DEFAULT 0,
	AddLevel INT NOT NULL DEFAULT 0,
	Experience INT NOT NULL DEFAULT 0,
	FactorPercent INT NOT NULL DEFAULT 0,
	NextLevel INT NOT NULL DEFAULT 0,
	Delta INT NOT NULL DEFAULT 0,
	PRIMARY KEY (CharacterID, SkillID),
	FOREIGN KEY (CharacterID) REFERENCES Characters (CharacterID) ON DELETE CASCADE
);

-- 14. Player Inventory
CREATE TABLE IF NOT EXISTS PlayerInventory (
	CharacterID INT NOT NULL,
	Data BYTEA NOT NULL,
	PRIMARY KEY (CharacterID),
	FOREIGN KEY (CharacterID) REFERENCES Characters (CharacterID) ON DELETE CASCADE
);

-- 15. Player Depots
CREATE TABLE IF NOT EXISTS PlayerDepots (
	CharacterID INT NOT NULL,
	DepotID SMALLINT NOT NULL,
	Data BYTEA NOT NULL,
	PRIMARY KEY (CharacterID, DepotID),
	FOREIGN KEY (CharacterID) REFERENCES Characters (CharacterID) ON DELETE CASCADE
);
