/**
 * Tibia Data Studio - Frontend SPA Controller (Vanilla JavaScript)
 * Manages UI logic for Items, Monsters, NPCs, MoveUse, Sprites, Function Dictionary, Minimap and Configuration.
 */

// =============================================================================
// LOCALIZATION DICTIONARY
// =============================================================================
// =============================================================================
// LOCALIZATION DICTIONARY (ENGLISH)
// =============================================================================
const I18N_DICT = {
  en: {
    // Sidebar
    nav_objects: "Items (objects.srv)",
    nav_monsters: "Monsters (.mon)",
    nav_npcs: "NPCs (.npc)",
    nav_moveuse: "Actions (moveuse.dat)",
    nav_sprites: "Sprites (.spr / .dat)",
    nav_docs: "Function Dictionary",
    nav_map: "Minimap & Spawns",
    nav_settings: "Directories & Config",
    server_active: "Server Active",
    backup_active: "🛡️ Automatic backups active",

    // Header
    search_placeholder: "Search by ID, Name...",
    btn_reload: "🔄 Reload",
    btn_save_current: "💾 Save Current",

    // Titles & Subtitles
    tab_objects_title: "Items Editor (objects.srv)",
    tab_objects_sub: "Complete management of attributes, weights, flags, and sprites",
    tab_monsters_title: "Monsters Editor (.mon)",
    tab_monsters_sub: "Edit attributes, stats, spells, and loot table",
    tab_npcs_title: "NPCs Editor (.npc)",
    tab_npcs_sub: "Edit appearance, home position, and dialogues",
    tab_moveuse_title: "Actions Editor (moveuse.dat)",
    tab_moveuse_sub: "Rules for use, doors, beds, transformations, and interactions",
    tab_sprites_title: "Sprites Browser (.spr / .dat)",
    tab_sprites_sub: "Inspection and preview of all game graphics",
    tab_docs_title: "CipSoft Function Dictionary",
    tab_docs_sub: "Complete guide to all Events, Conditions, and Actions of Move/Use Engine",
    tab_map_title: "Minimap & Spawns Visualizer",
    tab_map_sub: "Interactive rendering of map sectors (.sec), monsters, npcs and houses",
    tab_settings_title: "Directories & Settings",
    tab_settings_sub: "Paths to server and Tibia client folders",

    // Objects Tab
    objects_list_title: "Items List",
    btn_new_object: "+ New Item",
    all_flags: "All Flags",
    obj_details_title: "Item Properties",
    btn_save_object: "Save Item",
    btn_delete_object: "Delete",
    btn_select_sprite: "Select Sprite",
    lbl_obj_typeid: "Type ID (Object ID)*",
    lbl_obj_name: "Item Name*",
    lbl_obj_desc: "Description (Look Description)",
    lbl_obj_comment: "Internal Note / Comment",
    lbl_numeric_attrs: "Common Attributes",
    lbl_weight: "Weight (100 = 1.00 oz)",
    lbl_capacity: "Capacity (Slots)",
    lbl_attack: "Attack Value",
    lbl_defend: "Defense Value",
    lbl_armor: "Armor Value",
    lbl_nutrition: "Nutrition (Food)",
    lbl_waypoints: "Waypoints (Ground)",
    lbl_totalexpire: "Total Expire Time",
    lbl_raw_attrs: "Other Attributes (key=val, ...)",
    lbl_flags: "Item Flags",
    btn_prev: "◀ Prev",
    btn_next: "Next ▶",
    obj_title_edit: "Edit:",
    obj_title_create: "Create New Item",
    obj_typeid_new: "New",
    obj_unnamed: "(Unnamed)",
    lbl_items_count: "items",
    lbl_page: "Page",

    // Monsters Tab
    monsters_list_title: "Server Monsters",
    btn_new_monster: "+ New Monster",
    btn_save_monster: "Save Monster",
    btn_combat_guide: "💡 Combat & Damage Guide",
    lbl_avg_melee: "⚔️ Avg Melee:",
    lbl_avg_armor: "🛡️ Armor Absorption:",
    lbl_flee_point: "🏃 Flee Point:",
    lbl_max_combo: "💥 Max Combo Theory:",
    lbl_mon_combat_sec: "⚔️ Combat & Attributes",
    lbl_mon_immunities_sec: "🛡️ Immunities & Behavior",
    lbl_mon_loot_sec: "💎 Loot / Drop Table (Inventory)",
    lbl_mon_spells_sec: "✨ Spells & Magic Attacks",
    lbl_mon_talk_sec: "💬 Combat Talk & Sounds (Talk)",
    lbl_mon_name: "Monster Name*",
    lbl_mon_race: "RaceNumber*",
    lbl_mon_outfit: "Outfit LookType",
    lbl_mon_colors: "Colors (Head-Body-Legs-Feet)",
    lbl_mon_hp: "HitPoints (Health)*",
    lbl_mon_exp: "Experience (XP)",
    lbl_mon_atk: "Attack (Max Melee Damage)",
    lbl_mon_def: "Defend (Shield/Defense)",
    lbl_mon_armor: "Armor (Armor Value)",
    lbl_mon_speed: "Speed (Movement Speed)",
    lbl_mon_blood: "Blood (Blood Type)",
    lbl_mon_flee: "Flee Threshold (Flee HP)",
    lbl_mon_corpse: "Corpse (Corpse Item ID)",
    lbl_mon_poison: "Poison (Melee Poison)",
    opt_blood_red: "Blood (Red Blood)",
    opt_blood_slime: "Slime (Green Slime)",
    opt_blood_undead: "Undead (No Blood / Smoke)",
    opt_blood_fire: "Fire (Fire / Flames)",
    opt_blood_energy: "Energy (Blue Energy)",
    btn_add_loot_item: "+ Add Loot Item",
    btn_add_monster_spell: "+ New Spell",
    btn_add_monster_talk: "+ New Talk Line",
    th_loot_item: "Item",
    th_loot_id: "ID",
    th_loot_count: "Max Count",
    th_loot_chance: "Chance (‰)",
    th_loot_percent: "Percentage",
    th_loot_action: "Actions",
    btn_remove: "Remove",
    th_spell_effect: "Effect",
    th_spell_type: "Type / Shape",
    th_spell_details: "Details",
    th_talk_mode: "Mode",
    th_talk_text: "Speech text",
    no_loot_registered: "No dropped items registered",
    no_spells_registered: "No spells registered. Click '+ New Spell' to add one.",
    no_talk_registered: "No talk lines registered. Click '+ New Talk Line' to add one.",
    badge_yell: "📣 Yell (#Y)",
    badge_say: "💬 Talk (Say)",
    placeholder_talk: "Type monster talk line...",
    mon_title_edit: "Edit:",
    mon_title_create: "Create New Monster",
    mon_race_new: "New",
    modal_pick_corpse: "Select Corpse Item",
    modal_pick_loot: "Add Item to Monster Loot",
    summary_combo_melee: "Melee",
    summary_combo_spells: "Spells",
    mon_filter_placeholder: "🔍 Filter name or race...",
    opt_mon_sort_name: "Name",
    opt_mon_sort_race: "Race Number",
    opt_mon_sort_hp: "HitPoints",
    opt_mon_sort_exp: "Experience",
    opt_mon_sort_atk: "Attack",
    btn_sort_asc: "▲ Asc",
    btn_sort_desc: "▼ Desc",

    // Spell Types & Names
    dmg_name_physical: "Physical",
    dmg_name_fire: "Fire",
    dmg_name_poison: "Poison",
    dmg_name_energy: "Energy",
    dmg_name_death: "Death/SD",
    dmg_name_manadrain: "Mana Drain",
    dmg_name_holy: "Holy",
    dmg_name_drown: "Drowning",
    spell_lbl_damage: "Damage",
    spell_lbl_heal: "Self-Heal",
    spell_lbl_summon: "Summon: Race",
    spell_lbl_minions: "minions",
    spell_lbl_turns: "Turns",
    spell_lbl_to: "to",

    // Monster Spell Builder Modal
    modal_mon_spell_title: "✨ Create / Edit Monster Spell",
    lbl_spell_impact: "Spell Effect (Impact)*",
    opt_impact_damage: "Damage (Elemental / Physical / Death / Mana)",
    opt_impact_healing: "Healing (Health Heal / Self-Heal)",
    opt_impact_speed: "Speed (Paralyze / Haste)",
    opt_impact_summon: "Summon (Summon Creatures / Minions)",
    opt_impact_field: "Field (Create Fire/Poison Field on Ground)",
    opt_impact_drunken: "Drunken (Drunkenness)",
    lbl_spell_shape: "Cast Shape / Target (Shape)*",
    opt_shape_origin: "Origin (Straight Line Projectile)",
    opt_shape_victim: "Victim (Locked on Target)",
    opt_shape_actor: "Actor (On Self / Self Buff)",
    opt_shape_destination: "Destination (Ground Area / Bomb)",
    opt_shape_angle: "Angle (Wave / Front Cone)",
    lbl_spell_params_title: "🎯 Damage and Effect Parameters",
    lbl_spell_dmg_type: "Damage Element / Type",
    opt_dmg_fire: "Fire (4 - Fire / Flames)",
    opt_dmg_energy: "Energy (16 - Energy / Lightning)",
    opt_dmg_poison: "Poison (8 - Poison / Earth)",
    opt_dmg_death: "Death / LifeDrain (32 - Death / SD)",
    opt_dmg_physical: "Physical (1 - Physical / Impact)",
    opt_dmg_manadrain: "ManaDrain (64 - Mana Drain)",
    opt_dmg_holy: "Holy (128 - Holy Light)",
    opt_dmg_drown: "Drown (256 - Drowning)",
    lbl_spell_dmg_min: "Min Damage",
    lbl_spell_dmg_max: "Max Damage",
    lbl_spell_heal_min: "Min Heal",
    lbl_spell_heal_max: "Max Heal",
    lbl_spell_speed_val: "Speed Change (e.g. -50 or +60)",
    lbl_spell_speed_dur: "Duration (Seconds)",
    lbl_spell_speed_eff: "Speed Effect (ID)",
    lbl_spell_summon_race: "Summoned Monster RaceNumber",
    lbl_spell_summon_count: "Max Summoned Count",
    lbl_spell_field_item: "Field Item ID (e.g. 1487 = Fire Field)",
    lbl_spell_drunk_int: "Intensity (1 to 100)",
    lbl_spell_drunk_dur: "Duration (Seconds)",
    lbl_spell_drunk_eff: "Effect (ID)",
    lbl_spell_visual_title: "🔮 Visual Effect, Projectile & Delay",
    lbl_spell_magic_effect: "Magic Effect on Impact",
    lbl_pick_spell_effect_btn: "✨ Choose",
    lbl_spell_missile_effect: "Distance Missile",
    lbl_spell_delay: "Delay / Turns Frequency*",
    lbl_mon_spell_code_title: "Formatted .mon line:",
    btn_cancel_mon_spell: "Cancel",
    btn_confirm_mon_spell: "Save Spell",

    // Monster Combat Guide & Simulator Modal
    combat_guide_title: "💡 Combat Guide, Damage Calculations & Formulas (CipSoft 7.72)",
    sim_title_text: "🎯 Quick Melee Damage Simulator",
    sim_badge_text: "Based on C++",
    lbl_sim_mon_atk: "Monster Attack (Attack):",
    lbl_sim_target_def: "Target Defense (Defend):",
    lbl_sim_target_armor: "Target Armor (Armor):",
    btn_run_damage_sim: "🎲 Simulate 100 Attacks",
    sim_lbl_avg: "Avg Damage / Turn",
    sim_lbl_max: "Max Damage Dealt",
    sim_lbl_block: "Block Rate (Poff)",
    sim_lbl_hits: "Damaging Hits",
    btn_close_combat_guide_footer: "Close Guide",

    // NPCs Tab
    npcs_list_title: "Server NPCs",
    btn_new_npc: "+ New NPC",
    btn_save_npc: "Save NPC",
    npc_details_title: "NPC Editor",
    lbl_npc_name: "Name*",
    lbl_npc_sex: "Sex",
    opt_npc_sex_male: "Male",
    opt_npc_sex_female: "Female",
    lbl_npc_outfit: "LookType",
    lbl_npc_home: "Home Position [X, Y, Z]",
    lbl_npc_radius: "Walk Radius",
    lbl_npc_colors: "Outfit Colors (H-B-L-F)",
    lbl_npc_palette_sec: "🎨 Outfit Color Palette (Tibia Client)",
    tab_pal_head: "Head",
    tab_pal_primary: "Primary",
    tab_pal_secondary: "Secondary",
    tab_pal_detail: "Detail",
    btn_npc_random_colors: "🎲 Random Colors",
    btn_npc_reset_colors: "🔄 Reset (0-0-0-0)",
    btn_tab_npc_dialogues: "💬 Dialogues & Responses",
    btn_tab_npc_ndb: "🛒 Shop & Modules (NDB)",
    btn_tab_npc_raw: "📝 Full Script (.npc)",
    lbl_npc_greetings_title: "👋 Greetings, Focus & Farewell",
    lbl_npc_greeting: "Greeting (Player says 'hi' / 'hello')",
    lbl_npc_farewell: "Farewell (Player says 'bye' / 'farewell')",
    lbl_npc_busy: "When Busy with another Player (BUSY)",
    lbl_npc_vanish: "Player Walks Away (VANISH)",
    lbl_npc_aggressive: "Auto On-Sight Talk (No Trigger / Aggressive)",
    lbl_npc_keywords_title: "💬 Custom Keywords & Dialogue Rules",
    btn_add_npc_keyword: "+ Add Rule",
    th_npc_keyword: "Keywords",
    th_npc_condition: "Condition / Topic",
    th_npc_response: "NPC Response",
    th_npc_actions: "Actions / Effects",
    lbl_npc_ndb_modules: "📦 Official CipSoft Modules (.ndb)",
    lbl_npc_ndb_desc: "Check the pre-built CipSoft trade modules to include automatically in this NPC:",
    lbl_npc_behaviour: "Full Behaviour Code ({ ... })",
    npc_title_edit: "Edit:",
    npc_title_create: "Create New NPC",
    lbl_lines: "lines",
    npc_filter_placeholder: "🔍 Filter name or outfit...",
    opt_npc_filter_all: "All NPCs",
    opt_npc_filter_creatures: "Standard Outfits",
    opt_npc_filter_items: "Item Outfits (0)",
    modal_select_item_outfit: "Select Item for NPC Outfit",
    btn_pick_npc_item: "📦 Pick Item",
    badge_item_outfit_label: "Item Outfit",

    // MoveUse Tab
    moveuse_sections_title: "Rule Sections",
    moveuse_rules_title: "Section Rules",
    btn_add_rule: "+ New Rule",
    btn_save_moveuse: "Save moveuse.dat",
    moveuse_rules_of_section: "Rules of Section:",
    lbl_rules: "rules",
    no_section_selected: "No section selected",

    // Sprites Tab
    sprites_panel_title: "Tibia.spr Sprites Browser",
    sprites_search_placeholder: "Go to Sprite ID...",
    btn_search: "Search",
    lbl_zoom_text: "Zoom:",
    btn_first: "First",
    btn_prev_sprite: "Previous",
    btn_next_sprite: "Next",
    btn_last: "Last",
    btn_go: "Go",
    lbl_page_text: "Page",
    lbl_of: "of",
    lbl_showing_sprites: "Showing sprites",

    // CipSoft Function Dictionary Tab
    docs_panel_title: "📚 CipSoft Function Dictionary & Guide (Move/Use Engine)",
    docs_panel_subtitle: "Complete catalog of all Events, Conditions, Actions, Targets, and Parameters supported by the server.",
    doc_btn_all: "All",
    doc_btn_events: "Events (5)",
    doc_btn_conds: "Conditions (19)",
    doc_btn_acts: "Actions / Effects (17)",
    docs_search_placeholder: "Search by function name, keyword, example (e.g. Change, IsType, Level, Effect, Logout)...",
    badge_event_label: "Event / Trigger",
    badge_condition_label: "Condition",
    badge_action_label: "Action / Effect",
    lbl_parameters: "Parameters:",
    lbl_example: "Example:",

    // Rule Builder
    builder_modal_title: "⚡ CipSoft Event & Rule Builder",
    lbl_builder_sec: "Section in moveuse.dat (e.g., Beds, Doors, Keys, Fun)*",
    lbl_builder_trigger: "Trigger Event*",
    opt_trig_use: "Use (Click 'Use' on item - Obj1)",
    opt_trig_multiuse: "MultiUse ('Use With' - Use Obj1 on Obj2)",
    opt_trig_movement: "Movement (Drag item or walk on tile)",
    opt_trig_collision: "Collision (Step on floor lever/tile)",
    opt_trig_separation: "Separation (Step off tile)",
    lbl_builder_conds: "🔎 Required Conditions (If this happens...)",
    add_condition_opt: "+ Add Condition...",
    lbl_builder_acts: "⚡ Resulting Actions & Effects (Then do this...)",
    add_action_opt: "+ Add Action...",
    lbl_builder_raw: "Formatted moveuse.dat line:",
    btn_cancel: "Cancel",
    btn_confirm_rule: "Save Rule to moveuse.dat",
    choose_effect_btn: "✨ Choose Effect...",
    choose_item_btn: "📦 Choose Item...",
    custom_chip: "Custom",
    no_cond_added: "No conditions added (will always execute).",
    no_act_added: "No actions added.",
    modal_pick_cond_item: "Select Item for Condition",
    modal_pick_act_item: "Select Item for Action",

    // Modals
    modal_picker_title: "Select Item from objects.srv",
    modal_item_search: "Filter by name or ID...",
    modal_effect_picker_title: "✨ Select CipSoft Magic Effect",
    modal_effect_search: "Filter by effect name or ID...",

    // Settings
    settings_panel_title: "Directory Paths & Settings",
    lbl_cfg_data_path: "Server Data Directory (tibia-game_data)",
    sub_cfg_data_path: "Contains <code>dat/</code>, <code>mon/</code>, <code>npc/</code> folders.",
    lbl_cfg_client_path: "Tibia Client Directory (with Tibia.spr and Tibia.dat)",
    sub_cfg_client_path: "Used to extract and render all game graphics and sprites.",
    lbl_cfg_status: "File Loading Status:",
    btn_save_config: "Save & Reload Data",
    status_loaded: "Loaded",
    status_not_found: "Not found",
    status_spr_missing: "Not loaded (Select client folder)",
    status_types: "types",
    status_sections: "sections",
    status_creatures: "creatures",
    status_npcs: "NPCs",
    status_sprites: "sprites",
    status_items: "items",

    // Unsaved Changes (Dirty State)
    lbl_unsaved_text: "Unsaved changes",
    lbl_modal_unsaved_title: "⚠️ Unsaved Changes",
    lbl_modal_unsaved_msg: "You have unsaved edits. Would you like to save your changes before proceeding, or discard them?",
    btn_unsaved_save: "💾 Save & Proceed",
    btn_unsaved_discard: "🗑️ Discard",
    btn_unsaved_cancel: "Cancel",

    // Toasts
    toast_reloading: "Reloading data...",
    toast_updated: "Data updated successfully!",
    toast_item_saved: "Item saved successfully!",
    toast_monster_saved: "Monster saved successfully!",
    toast_npc_saved: "NPC saved successfully!",
    toast_moveuse_saved: "moveuse.dat saved successfully!",
    toast_config_saved: "Settings saved and data reloaded!",
    toast_sprite_copied: "Sprite ID copied",
    toast_invalid_typeid: "Please provide a valid TypeID!",
    toast_invalid_sprite_id: "Please provide a valid Sprite ID!",
    toast_error_save_item: "Error saving item",
    toast_net_error_save_item: "Network error while saving item",
    toast_item_deleted: "Item deleted",
    toast_error_delete_item: "Error deleting item",
    toast_warn_monster_name: "Please enter a monster name",
    toast_error_save_monster: "Error saving monster",
    toast_warn_npc_name: "Please enter an NPC name",
    toast_error_save_npc: "Error saving NPC",
    toast_error_save_moveuse: "Error saving moveuse.dat",
    toast_error_load_config: "Error loading directory settings",
    npc_no_keywords: "No keywords registered. Click '+ Add Rule' to create dialogue responses to words like 'job', 'name', 'offer', etc.",

    // Innovative Features: Directions, NPC Chat Simulator, Monte Carlo Loot & Backups
    btn_loot_sim: "🎲 Loot Simulator",
    tab_npc_simulator: "🎮 Live Chat Simulator",
    chat_sim_welcome: "Type a message to interact with the NPC in real time (e.g. 'hi', 'job', 'offer').",
    chat_sim_placeholder: "Say something to the NPC (e.g. hi, buy bread, yes)...",
    chat_sim_send: "Send",
    chat_sim_reset: "🔄 Reset",
    lbl_sim_player: "Player:",
    lbl_sim_gold: "Gold:",
    loot_sim_title: "🎲 Loot Drop Simulator (Monte Carlo)",
    lbl_loot_sim_kills: "Kills to simulate:",
    btn_run_loot_sim: "⚡ Run Simulation",
    lbl_sim_total_drops: "Total Drops:",
    lbl_sim_total_gold: "Estimated Gold Value:",
    lbl_sim_avg_gold: "Avg per Kill:",
    th_sim_item: "Item",
    th_sim_theory: "Theory Chance",
    th_sim_real: "Actual Chance",
    th_sim_dropped: "Qty Dropped",
    th_sim_gold: "Total Value",
    rarity_common: "Common",
    rarity_uncommon: "Uncommon",
    rarity_rare: "Rare",
    rarity_very_rare: "Very Rare",
    lbl_cfg_backups_title: "🛡️ Automatic Backup History",
    sub_cfg_backups: "Timestamped backups created before every save for maximum safety and data loss prevention.",
    btn_refresh_backups: "🔄 Refresh",
    th_bak_time: "Date & Time",
    th_bak_file: "Original File",
    th_bak_cat: "Category",
    th_bak_size: "Size",
    th_bak_action: "Action",
    btn_restore: "Restore",
    confirm_restore_backup: "Are you sure you want to restore this backup? The active file will be overwritten with this version.",
    toast_backup_restored: "Backup restored successfully! Server data reloaded.",
    toast_backup_restore_error: "Failed to restore backup.",
    no_backups_found: "No backup files found yet."
  }
};

// =============================================================================
// GLOBAL APPLICATION STATE
// =============================================================================
const state = {
  lang: "en",
  currentTab: "tab-objects",
  isDirty: false,
  pendingNavigation: null,
  objects: {
    page: 1,
    limit: 40,
    search: "",
    flag: "",
    selectedTypeID: null,
    total: 0
  },
  monsters: {
    list: [],
    selectedFilename: null,
    search: "",
    sortBy: "name",
    sortOrder: "asc"
  },
  npcs: {
    list: [],
    selectedFilename: null,
    search: "",
    filterType: "all"
  },
  moveuse: {
    sections: [],
    selectedSectionIndex: 0,
    search: ""
  },
  sprites: {
    page: 1,
    limit: 250,
    currentZoom: 1,
    total: 10962
  },
  docs: {
    catalog: { events: [], conditions: [], actions: [] },
    filter: "all",
    search: ""
  },
  builder: {
    editingSection: "",
    editingRuleIndex: null,
    eventType: "Use",
    conditions: [],
    actions: []
  },
  effects: [],
  config: {},
  outfits: {
    mon: { dir: 2, anim: 0, timer: null },
    npc: { dir: 2, anim: 0, timer: null }
  },
  npcChat: {
    topic: 0,
    playerMoney: 1000,
    lastPrice: 0
  },
  lootSim: {
    kills: 100
  },
  map: {
    centerX: 32360,
    centerY: 32199,
    z: 7,
    zoom: 1.0,
    radius: 16,
    tiles: {},
    spawns: [],
    npcs: [],
    houses: [],
    signs: [],
    cities: [],
    activeSubtab: "spawns",
    searchQuery: "",
    selectedSpawn: null,
    selectedNpc: null,
    selectedSign: null,
    layers: {
      monsters: true,
      npcs: true,
      outfits: true,
      signs: true,
      houses: true,
      lowerFloors: true,
      grid: false
    },
    hoveredCoord: { x: 32360, y: 32199, z: 7 },
    hoveredEntity: null
  },
  questWizard: {
    chestId: 1746,
    triggerMode: "actionid",
    triggerValue: "2000",
    rewardId: 2493,
    rewardCount: 1,
    storageKey: 10001,
    msgSuccess: "You have found a demon helmet.",
    msgEmpty: "It is empty."
  }
};

function t(key) {
  const dict = I18N_DICT["en"];
  return dict[key] || key;
}

function setDirty(isDirty) {
  state.isDirty = !!isDirty;
  const badge = document.getElementById("unsaved-changes-badge");
  if (badge) {
    badge.style.display = state.isDirty ? "inline-flex" : "none";
  }

  const baseTitle = "Tibia Data Studio";
  if (state.isDirty) {
    if (!document.title.startsWith("⚠️ * ")) {
      document.title = `⚠️ * ${document.title.replace(/^⚠️ \*\s*/, "") || baseTitle}`;
    }
    const saveBtn = document.getElementById("btn-global-save");
    if (saveBtn) saveBtn.classList.add("btn-dirty");
  } else {
    document.title = document.title.replace(/^⚠️ \*\s*/, "") || baseTitle;
    const saveBtn = document.getElementById("btn-global-save");
    if (saveBtn) saveBtn.classList.remove("btn-dirty");
  }
}

function confirmNavigation(onProceed) {
  if (!state.isDirty) {
    if (typeof onProceed === "function") onProceed();
    return;
  }
  state.pendingNavigation = onProceed;
  const modal = document.getElementById("unsaved-changes-modal");
  if (modal) modal.classList.add("active");
}

function setupUnsavedChangesModal() {
  const modal = document.getElementById("unsaved-changes-modal");
  const btnClose = document.getElementById("btn-close-unsaved-modal");
  const btnCancel = document.getElementById("btn-unsaved-cancel");
  const btnDiscard = document.getElementById("btn-unsaved-discard");
  const btnSave = document.getElementById("btn-unsaved-save");

  const closeModal = () => {
    if (modal) modal.classList.remove("active");
  };

  if (btnClose) {
    btnClose.addEventListener("click", () => {
      closeModal();
      state.pendingNavigation = null;
    });
  }

  if (btnCancel) {
    btnCancel.addEventListener("click", () => {
      closeModal();
      state.pendingNavigation = null;
    });
  }

  if (btnDiscard) {
    btnDiscard.addEventListener("click", () => {
      closeModal();
      setDirty(false);
      if (typeof state.pendingNavigation === "function") {
        const cb = state.pendingNavigation;
        state.pendingNavigation = null;
        cb();
      }
    });
  }

  if (btnSave) {
    btnSave.addEventListener("click", async () => {
      let success = false;
      if (state.currentTab === "tab-objects") {
        success = await saveCurrentObject();
      } else if (state.currentTab === "tab-monsters") {
        success = await saveCurrentMonster();
      } else if (state.currentTab === "tab-npcs") {
        success = await saveCurrentNpc();
      } else if (state.currentTab === "tab-moveuse") {
        success = await saveMoveUse();
      } else if (state.currentTab === "tab-settings") {
        const btnSaveCfg = document.getElementById("btn-save-config");
        if (btnSaveCfg) {
          btnSaveCfg.click();
          success = true;
        }
      } else {
        success = true;
      }

      if (success !== false) {
        closeModal();
        setDirty(false);
        if (typeof state.pendingNavigation === "function") {
          const cb = state.pendingNavigation;
          state.pendingNavigation = null;
          cb();
        }
      }
    });
  }

  window.addEventListener("beforeunload", (e) => {
    if (state.isDirty) {
      e.preventDefault();
      e.returnValue = "";
      return "";
    }
  });
}

function setupDirtyTracking() {
  const isExcluded = (target) => {
    if (!target) return true;
    const id = target.id || "";
    const excludedIds = [
      "global-search", "sprite-id-search", "docs-search-input",
      "modal-item-search", "modal-effect-search",
      "sim-target-def", "sim-target-armor", "sim-mon-atk",
      "app-language-select", "obj-flag-filter"
    ];
    if (excludedIds.includes(id)) return true;
    if (target.closest("#monster-combat-guide-modal")) return true;
    if (target.closest(".sidebar") || target.closest(".header")) return true;
    return false;
  };

  document.addEventListener("input", (e) => {
    if (isExcluded(e.target)) return;
    const inEditableTab = e.target.closest("#tab-objects, #tab-monsters, #tab-npcs, #tab-moveuse, #tab-settings, #rule-builder-modal, #monster-spell-modal");
    if (inEditableTab) {
      setDirty(true);
    }
  });

  document.addEventListener("change", (e) => {
    if (isExcluded(e.target)) return;
    const inEditableTab = e.target.closest("#tab-objects, #tab-monsters, #tab-npcs, #tab-moveuse, #tab-settings, #rule-builder-modal, #monster-spell-modal");
    if (inEditableTab) {
      setDirty(true);
    }
  });
}

async function setLanguage(lang = "en") {
  state.lang = "en";
  applyTranslationsToDOM();
  await loadDocs();
  
  if (state.currentTab === "tab-monsters") {
    if (state.monsters.selectedFilename) {
      const monName = document.getElementById("mon-name")?.value || "";
      setText("monster-title", `${t("mon_title_edit")} ${monName} (${state.monsters.selectedFilename})`);
    } else {
      setText("monster-title", t("mon_title_create"));
    }
    renderLootTable();
    renderMonsterSpellsList();
    renderMonsterTalkList();
    updateMonsterCombatSummary();
  }
  if (state.currentTab === "tab-settings") {
    renderConfigStatus();
  }
  if (state.currentTab === "tab-moveuse") {
    renderMoveUseSections();
    renderMoveUseRules();
  }
  if (state.currentTab === "tab-objects") {
    if (state.objects.selectedTypeID) {
      const objName = document.getElementById("obj-name")?.value || "";
      setText("lbl-obj-props-title", `${t("obj_title_edit")} ${objName} (ID: ${state.objects.selectedTypeID})`);
    } else {
      setText("lbl-obj-props-title", t("obj_title_create"));
    }
    loadObjects();
  }
  if (state.currentTab === "tab-npcs") {
    if (state.npcs.selectedFilename) {
      const npcName = document.getElementById("npc-name")?.value || "";
      setText("npc-title", `${t("npc_title_edit")} ${npcName} (${state.npcs.selectedFilename})`);
    } else {
      setText("npc-title", t("npc_title_create"));
    }
    renderNpcsList();
  }
  if (state.currentTab === "tab-sprites") {
    renderSpritesGrid();
  }
}

function escapeHtmlText(v) {
  return String(v == null ? "" : v)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.innerText = text;
}

function setHTML(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

function setPlaceholder(id, ph) {
  const el = document.getElementById(id);
  if (el) el.placeholder = ph;
}

function applyTranslationsToDOM() {
  const titles = {
    "tab-objects": { title: t("tab_objects_title"), sub: t("tab_objects_sub") },
    "tab-monsters": { title: t("tab_monsters_title"), sub: t("tab_monsters_sub") },
    "tab-npcs": { title: t("tab_npcs_title"), sub: t("tab_npcs_sub") },
    "tab-moveuse": { title: t("tab_moveuse_title"), sub: t("tab_moveuse_sub") },
    "tab-sprites": { title: t("tab_sprites_title"), sub: t("tab_sprites_sub") },
    "tab-docs": { title: t("tab_docs_title"), sub: t("tab_docs_sub") },
    "tab-map": { title: t("tab_map_title"), sub: t("tab_map_sub") },
    "tab-settings": { title: t("tab_settings_title"), sub: t("tab_settings_sub") }
  };

  const curInfo = titles[state.currentTab] || { title: "Tibia Studio", sub: "" };
  setText("current-tab-title", curInfo.title);
  setText("current-tab-subtitle", curInfo.sub);

  // Header
  setPlaceholder("global-search", t("search_placeholder"));
  setText("btn-reload-data", t("btn_reload"));
  setText("btn-global-save", t("btn_save_current"));

  // Nav labels
  const navMap = [
    { tab: "tab-objects", key: "nav_objects" },
    { tab: "tab-monsters", key: "nav_monsters" },
    { tab: "tab-npcs", key: "nav_npcs" },
    { tab: "tab-moveuse", key: "nav_moveuse" },
    { tab: "tab-sprites", key: "nav_sprites" },
    { tab: "tab-docs", key: "nav_docs" },
    { tab: "tab-map", key: "nav_map" },
    { tab: "tab-settings", key: "nav_settings" }
  ];
  navMap.forEach(({ tab, key }) => {
    const btn = document.querySelector(`.nav-item[data-tab='${tab}'] .nav-label`);
    if (btn) btn.innerText = t(key);
  });

  // Footer
  setText("server-status", t("server_active"));
  const bNote = document.querySelector(".backup-note");
  if (bNote) bNote.innerText = t("backup_active");

  // Objects Tab
  setText("lbl-objects-list-title", t("objects_list_title"));
  setText("btn-new-object", t("btn_new_object"));
  setText("opt-flag-all", t("all_flags"));
  setText("lbl-obj-props-title", t("obj_details_title"));
  setText("btn-delete-object", t("btn_delete_object"));
  setText("btn-save-object", t("btn_save_object"));
  setText("btn-open-sprite-picker", t("btn_select_sprite"));
  setText("lbl-obj-typeid", t("lbl_obj_typeid"));
  setText("lbl-obj-name", t("lbl_obj_name"));
  setText("lbl-obj-desc", t("lbl_obj_desc"));
  setText("lbl-obj-comment", t("lbl_obj_comment"));
  setText("lbl-numeric-attrs", t("lbl_numeric_attrs"));
  setText("lbl-weight", t("lbl_weight"));
  setText("lbl-capacity", t("lbl_capacity"));
  setText("lbl-attack", t("lbl_attack"));
  setText("lbl-defend", t("lbl_defend"));
  setText("lbl-armor", t("lbl_armor"));
  setText("lbl-nutrition", t("lbl_nutrition"));
  setText("lbl-waypoints", t("lbl_waypoints"));
  setText("lbl-totalexpire", t("lbl_totalexpire"));
  setText("lbl-raw-attrs", t("lbl_raw_attrs"));
  setText("lbl-flags", t("lbl_flags"));
  setText("btn-prev-page", t("btn_prev"));
  setText("btn-next-page", t("btn_next"));

  // Monsters Tab
  setText("lbl-monsters-list-title", t("monsters_list_title"));
  setText("btn-new-monster", t("btn_new_monster"));
  setPlaceholder("mon-filter-search", t("mon_filter_placeholder"));
  setText("opt-mon-sort-name", t("opt_mon_sort_name"));
  setText("opt-mon-sort-race", t("opt_mon_sort_race"));
  setText("opt-mon-sort-hp", t("opt_mon_sort_hp"));
  setText("opt-mon-sort-exp", t("opt_mon_sort_exp"));
  setText("opt-mon-sort-atk", t("opt_mon_sort_atk"));
  const monSortIcon = document.getElementById("mon-sort-dir-icon");
  if (monSortIcon) {
    monSortIcon.innerText = (state.monsters && state.monsters.sortOrder === "desc") ? t("btn_sort_desc") : t("btn_sort_asc");
  }
  setText("btn-mon-combat-guide", t("btn_combat_guide"));
  setText("btn-save-monster", t("btn_save_monster"));
  setText("lbl-summary-avg-melee", t("lbl_avg_melee"));
  setText("lbl-summary-avg-armor", t("lbl_avg_armor"));
  setText("lbl-summary-flee-pct", t("lbl_flee_point"));
  setText("lbl-summary-max-combo", t("lbl_max_combo"));
  setText("lbl-mon-combat-sec", t("lbl_mon_combat_sec"));
  setText("lbl-mon-immunities-sec", t("lbl_mon_immunities_sec"));
  setText("lbl-mon-loot-sec", t("lbl_mon_loot_sec"));
  setText("lbl-mon-spells-sec", t("lbl_mon_spells_sec"));
  setText("lbl-mon-talk-sec", t("lbl_mon_talk_sec"));
  setText("th-spell-effect", t("th_spell_effect"));
  setText("th-spell-type", t("th_spell_type"));
  setText("th-spell-details", t("th_spell_details"));
  setText("th-spell-action", t("th_loot_action"));
  setText("th-talk-mode", t("th_talk_mode"));
  setText("th-talk-text", t("th_talk_text"));
  setText("th-talk-action", t("th_loot_action"));
  setText("lbl-mon-name", t("lbl_mon_name"));
  setText("lbl-mon-race", t("lbl_mon_race"));
  setText("lbl-mon-outfit", t("lbl_mon_outfit"));
  setText("lbl-mon-colors", t("lbl_mon_colors"));
  setText("lbl-mon-hp", t("lbl_mon_hp"));
  setText("lbl-mon-exp", t("lbl_mon_exp"));
  setText("lbl-mon-atk", t("lbl_mon_atk"));
  setText("lbl-mon-def", t("lbl_mon_def"));
  setText("lbl-mon-armor", t("lbl_mon_armor"));
  setText("lbl-mon-speed", t("lbl_mon_speed"));
  setText("lbl-mon-blood", t("lbl_mon_blood"));
  setText("lbl-mon-flee", t("lbl_mon_flee"));
  setText("lbl-mon-corpse", t("lbl_mon_corpse"));
  setText("lbl-mon-poison", t("lbl_mon_poison"));

  setText("opt-blood-red", t("opt_blood_red"));
  setText("opt-blood-slime", t("opt_blood_slime"));
  setText("opt-blood-undead", t("opt_blood_undead"));
  setText("opt-blood-fire", t("opt_blood_fire"));
  setText("opt-blood-energy", t("opt_blood_energy"));

  setText("th-loot-item", t("th_loot_item"));
  setText("th-loot-id", t("th_loot_id"));
  setText("th-loot-count", t("th_loot_count"));
  setText("th-loot-chance", t("th_loot_chance"));
  setText("th-loot-percent", t("th_loot_percent"));
  setText("th-loot-action", t("th_loot_action"));
  setText("btn-add-loot-item", t("btn_add_loot_item"));
  setText("btn-add-monster-spell", t("btn_add_monster_spell"));
  setText("btn-add-monster-talk", t("btn_add_monster_talk"));

  // Monster Spell Builder Modal
  setText("modal-mon-spell-title", t("modal_mon_spell_title"));
  setText("lbl-spell-impact", t("lbl_spell_impact"));
  setText("opt-impact-damage", t("opt_impact_damage"));
  setText("opt-impact-healing", t("opt_impact_healing"));
  setText("opt-impact-speed", t("opt_impact_speed"));
  setText("opt-impact-summon", t("opt_impact_summon"));
  setText("opt-impact-field", t("opt_impact_field"));
  setText("opt-impact-drunken", t("opt_impact_drunken"));
  setText("lbl-spell-shape", t("lbl_spell_shape"));
  setText("opt-shape-origin", t("opt_shape_origin"));
  setText("opt-shape-victim", t("opt_shape_victim"));
  setText("opt-shape-actor", t("opt_shape_actor"));
  setText("opt-shape-destination", t("opt_shape_destination"));
  setText("opt-shape-angle", t("opt_shape_angle"));
  setText("lbl-spell-params-title", t("lbl_spell_params_title"));
  setText("lbl-spell-dmg-type", t("lbl_spell_dmg_type"));
  setText("opt-dmg-fire", t("opt_dmg_fire"));
  setText("opt-dmg-energy", t("opt_dmg_energy"));
  setText("opt-dmg-poison", t("opt_dmg_poison"));
  setText("opt-dmg-death", t("opt_dmg_death"));
  setText("opt-dmg-physical", t("opt_dmg_physical"));
  setText("opt-dmg-manadrain", t("opt_dmg_manadrain"));
  setText("opt-dmg-holy", t("opt_dmg_holy"));
  setText("opt-dmg-drown", t("opt_dmg_drown"));
  setText("lbl-spell-dmg-min", t("lbl_spell_dmg_min"));
  setText("lbl-spell-dmg-max", t("lbl_spell_dmg_max"));
  setText("lbl-spell-heal-min", t("lbl_spell_heal_min"));
  setText("lbl-spell-heal-max", t("lbl_spell_heal_max"));
  setText("lbl-spell-speed-val", t("lbl_spell_speed_val"));
  setText("lbl-spell-speed-dur", t("lbl_spell_speed_dur"));
  setText("lbl-spell-speed-eff", t("lbl_spell_speed_eff"));
  setText("lbl-spell-summon-race", t("lbl_spell_summon_race"));
  setText("lbl-spell-summon-count", t("lbl_spell_summon_count"));
  setText("lbl-spell-field-item", t("lbl_spell_field_item"));
  setText("lbl-spell-drunk-int", t("lbl_spell_drunk_int"));
  setText("lbl-spell-drunk-dur", t("lbl_spell_drunk_dur"));
  setText("lbl-spell-drunk-eff", t("lbl_spell_drunk_eff"));
  setText("lbl-spell-visual-title", t("lbl_spell_visual_title"));
  setText("lbl-spell-magic-effect", t("lbl_spell_magic_effect"));
  setText("lbl-pick-spell-effect-btn", t("lbl_pick_spell_effect_btn"));
  setText("lbl-spell-missile-effect", t("lbl_spell_missile_effect"));
  setText("lbl-spell-delay", t("lbl_spell_delay"));
  setText("lbl-mon-spell-code-title", t("lbl_mon_spell_code_title"));
  setText("btn-cancel-mon-spell", t("btn_cancel_mon_spell"));
  setText("btn-confirm-mon-spell", t("btn_confirm_mon_spell"));

  // Combat Guide & Simulator Modal
  setText("combat-guide-title", t("combat_guide_title"));
  setText("sim-title-text", t("sim_title_text"));
  setText("sim-badge-text", t("sim_badge_text"));
  setText("lbl-sim-mon-atk", t("lbl_sim_mon_atk"));
  setText("lbl-sim-target-def", t("lbl_sim_target_def"));
  setText("lbl-sim-target-armor", t("lbl_sim_target_armor"));
  setText("btn-run-damage-sim", t("btn_run_damage_sim"));
  setText("sim-lbl-avg", t("sim_lbl_avg"));
  setText("sim-lbl-max", t("sim_lbl_max"));
  setText("sim-lbl-block", t("sim_lbl_block"));
  setText("sim-lbl-hits", t("sim_lbl_hits"));
  setText("btn-close-combat-guide-footer", t("btn_close_combat_guide_footer"));
  renderCombatGuideCards();

  // NPCs Tab
  setText("lbl-npcs-list-title", t("npcs_list_title"));
  setText("btn-new-npc", t("btn_new_npc"));
  setPlaceholder("npc-filter-search", t("npc_filter_placeholder"));
  setText("opt-npc-filter-all", t("opt_npc_filter_all"));
  setText("opt-npc-filter-creatures", t("opt_npc_filter_creatures"));
  setText("opt-npc-filter-items", t("opt_npc_filter_items"));
  setText("btn-pick-npc-item", t("btn_pick_npc_item"));
  setText("btn-save-npc", t("btn_save_npc"));
  setText("lbl-npc-name", t("lbl_npc_name"));
  setText("lbl-npc-sex", t("lbl_npc_sex"));
  setText("opt-npc-sex-male", t("opt_npc_sex_male"));
  setText("opt-npc-sex-female", t("opt_npc_sex_female"));
  setText("lbl-npc-outfit", t("lbl_npc_outfit"));
  setText("lbl-npc-home", t("lbl_npc_home"));
  setText("lbl-npc-radius", t("lbl_npc_radius"));
  setText("lbl-npc-colors", t("lbl_npc_colors"));
  setText("lbl-npc-palette-sec", t("lbl_npc_palette_sec"));
  setText("tab-pal-head", t("tab_pal_head"));
  setText("tab-pal-primary", t("tab_pal_primary"));
  setText("tab-pal-secondary", t("tab_pal_secondary"));
  setText("tab-pal-detail", t("tab_pal_detail"));
  setText("btn-npc-random-colors", t("btn_npc_random_colors"));
  setText("btn-npc-reset-colors", t("btn_npc_reset_colors"));
  setText("btn-tab-npc-dialogues", t("btn_tab_npc_dialogues"));
  setText("btn-tab-npc-ndb", t("btn_tab_npc_ndb"));
  setText("btn-tab-npc-raw", t("btn_tab_npc_raw"));
  setText("lbl-npc-greetings-title", t("lbl_npc_greetings_title"));
  setText("lbl-npc-greeting", t("lbl_npc_greeting"));
  setText("lbl-npc-farewell", t("lbl_npc_farewell"));
  setText("lbl-npc-busy", t("lbl_npc_busy"));
  setText("lbl-npc-vanish", t("lbl_npc_vanish"));
  setText("lbl-npc-aggressive", t("lbl_npc_aggressive"));
  setText("lbl-npc-keywords-title", t("lbl_npc_keywords_title"));
  setText("btn-add-npc-keyword", t("btn_add_npc_keyword"));
  setText("th-npc-keyword", t("th_npc_keyword"));
  setText("th-npc-condition", t("th_npc_condition"));
  setText("th-npc-response", t("th_npc_response"));
  setText("th-npc-actions", t("th_npc_actions"));
  setText("lbl-npc-ndb-modules", t("lbl_npc_ndb_modules"));
  setText("lbl-npc-ndb-desc", t("lbl_npc_ndb_desc"));
  setText("lbl-npc-behaviour", t("lbl_npc_behaviour"));

  // MoveUse Tab
  setText("lbl-moveuse-sec-title", t("moveuse_sections_title"));
  setText("moveuse-section-title", t("moveuse_rules_title"));
  setText("btn-add-moveuse-rule", t("btn_add_rule"));
  setText("btn-save-moveuse", t("btn_save_moveuse"));

  // Sprites Tab
  setText("sprites-panel-title", t("sprites_panel_title"));
  setPlaceholder("sprite-id-search", t("sprites_search_placeholder"));
  setText("btn-go-sprite", t("btn_search"));
  setText("lbl-zoom-text", t("lbl_zoom_text"));
  setHTML("btn-sprites-first", `⏮️ ${t("btn_first")}`);
  setHTML("btn-sprites-prev", `◀️ ${t("btn_prev_sprite")}`);
  setHTML("btn-sprites-next", `${t("btn_next_sprite")} ▶️`);
  setHTML("btn-sprites-last", `${t("btn_last")} ⏭️`);
  setText("lbl-page-text", t("lbl_page_text"));
  setText("btn-sprites-jump", t("btn_go"));

  // Function Dictionary Tab
  setText("docs-panel-title", t("docs_panel_title"));
  setText("docs-panel-subtitle", t("docs_panel_subtitle"));
  setText("doc-btn-all", t("doc_btn_all"));
  setText("doc-btn-events", t("doc_btn_events"));
  setText("doc-btn-conds", t("doc_btn_conds"));
  setText("doc-btn-acts", t("doc_btn_acts"));
  setPlaceholder("docs-search-input", t("docs_search_placeholder"));

  // Event Builder Modal
  setText("builder-modal-title", t("builder_modal_title"));
  setText("lbl-builder-sec", t("lbl_builder_sec"));
  setText("lbl-builder-trigger", t("lbl_builder_trigger"));
  setText("opt-trig-use", t("opt_trig_use"));
  setText("opt-trig-multiuse", t("opt_trig_multiuse"));
  setText("opt-trig-movement", t("opt_trig_movement"));
  setText("opt-trig-collision", t("opt_trig_collision"));
  setText("opt-trig-separation", t("opt_trig_separation"));
  setText("lbl-builder-conds", t("lbl_builder_conds"));
  setText("lbl-builder-acts", t("lbl_builder_acts"));
  setText("lbl-builder-raw", t("lbl_builder_raw"));
  setText("btn-cancel-builder", t("btn_cancel"));
  setText("btn-confirm-rule", t("btn_confirm_rule"));

  // Pickers
  setText("modal-picker-title", t("modal_picker_title"));
  setPlaceholder("modal-item-search", t("modal_item_search"));
  setText("modal-effect-picker-title", t("modal_effect_picker_title"));
  setPlaceholder("modal-effect-search", t("modal_effect_search"));

  // Settings
  setText("settings-panel-title", t("settings_panel_title"));
  setText("lbl-cfg-data-path", t("lbl_cfg_data_path"));
  setHTML("sub-cfg-data-path", t("sub_cfg_data_path"));
  setText("lbl-cfg-client-path", t("lbl_cfg_client_path"));
  setText("sub-cfg-client-path", t("sub_cfg_client_path"));
  setText("lbl-cfg-status", t("lbl_cfg_status"));
  setText("btn-save-config", t("btn_save_config"));

  // Dirty State / Unsaved Changes Modal
  setText("lbl-unsaved-text", t("lbl_unsaved_text"));
  setText("lbl-modal-unsaved-title", t("lbl_modal_unsaved_title"));
  setText("lbl-modal-unsaved-msg", t("lbl_modal_unsaved_msg"));
  setText("btn-unsaved-save", t("btn_unsaved_save"));
  setText("btn-unsaved-discard", t("btn_unsaved_discard"));
  setText("btn-unsaved-cancel", t("btn_unsaved_cancel"));

  // Recursos Inovadores: Simulador de Loot, Chat NPC e Backups
  setText("btn-open-loot-sim", t("btn_loot_sim"));
  setText("btn-tab-npc-simulator", t("tab_npc_simulator"));
  setText("chat-sim-welcome-msg", t("chat_sim_welcome"));
  setPlaceholder("chat-sim-input", t("chat_sim_placeholder"));
  setText("btn-chat-sim-send", t("chat_sim_send"));
  setText("btn-chat-sim-reset", t("chat_sim_reset"));
  setText("lbl-sim-player", t("lbl_sim_player"));
  setText("lbl-sim-gold", t("lbl_sim_gold"));
  setText("loot-sim-title", t("loot_sim_title"));
  setText("lbl-loot-sim-kills", t("lbl_loot_sim_kills"));
  setText("btn-run-loot-sim", t("btn_run_loot_sim"));
  setText("lbl-sim-total-drops", t("lbl_sim_total_drops"));
  setText("lbl-sim-total-gold", t("lbl_sim_total_gold"));
  setText("lbl-sim-avg-gold", t("lbl_sim_avg_gold"));
  setText("th-sim-item", t("th_sim_item"));
  setText("th-sim-theory", t("th_sim_theory"));
  setText("th-sim-real", t("th_sim_real"));
  setText("th-sim-dropped", t("th_sim_dropped"));
  setText("th-sim-gold", t("th_sim_gold"));
  setText("lbl-cfg-backups-title", t("lbl_cfg_backups_title"));
  setText("sub-cfg-backups", t("sub_cfg_backups"));
  setText("btn-refresh-backups", t("btn_refresh_backups"));
  setText("th-bak-time", t("th_bak_time"));
  setText("th-bak-file", t("th_bak_file"));
  setText("th-bak-cat", t("th_bak_cat"));
  setText("th-bak-size", t("th_bak_size"));
  setText("th-bak-action", t("th_bak_action"));

  // Re-render components with translated texts
  if (state.currentTab === "tab-sprites") renderSpritesGrid();
  if (state.currentTab === "tab-docs") renderDocsGrid();
}

function renderCombatGuideCards() {
  const container = document.getElementById("combat-guide-grid");
  if (!container) return;

  container.innerHTML = `
    <div class="guide-topic-card">
      <h4>⚔️ 1. Melee Attack & Physical Damage</h4>
      <p>Every combat round (<strong>~2 seconds</strong>), the monster performs a physical attack against its target:</p>
      <div class="formula-box">
        <code>Raw_Damage = random(0, Attack)</code>
      </div>
      <p>Next, the target's <strong>Defense (Defend)</strong> value tries to block the blow:</p>
      <div class="formula-box">
        <code>Damage_After_Shield = max(0, Raw_Damage - Target_Defense)</code>
      </div>
      <p>If <code>Damage_After_Shield > 0</code>, the target's <strong>Armor</strong> absorbs part of the impact:</p>
      <div class="formula-box">
        <code>Armor_Absorption = (Armor / 2) + random(0, Armor / 2)</code><br>
        <code>Final_Damage = max(0, Damage_After_Shield - Armor_Absorption)</code>
      </div>
    </div>

    <div class="guide-topic-card">
      <h4>🛡️ 2. Defense & Resistances</h4>
      <ul>
        <li><strong>Defend:</strong> Acts as shield defense. Blocks physical damage from up to 2 attackers per round.</li>
        <li><strong>Armor:</strong> Absorbs residual damage. On average absorbs <strong>75%</strong> of Armor value on each physical hit.</li>
        <li><strong>Poison:</strong> If <code>Poison > 0</code>, when landing a physical hit the monster inflicts poison damage from <code>Poison/2</code> to <code>Poison</code> per second.</li>
        <li><strong>Blood:</strong> Type of blood emitted (Blood = Red, Slime = Green, Undead = Smoke, Fire = Flames, Energy = Blue).</li>
      </ul>
    </div>

    <div class="guide-topic-card">
      <h4>✨ 3. Spells & Ranged Magic Attacks</h4>
      <p>Spells formatted as <code>Shape -> Impact : Delay</code> are evaluated each turn:</p>
      <ul>
        <li><strong>Shape:</strong> How the spell is cast:
          <br>• <code>Origin(Missile, Effect)</code>: Straight line projectile.
          <br>• <code>Victim(Missile, Range, Effect)</code>: Locked-on target projectile.
          <br>• <code>Actor(Effect)</code>: Centered on monster (Self Buff / Heal).
          <br>• <code>Destination(...)</code>: Ground area / Bomb.
          <br>• <code>Angle(...)</code>: Frontal cone / wave (e.g. Dragon Wave).
        </li>
        <li><strong>Impact:</strong> The resulting effect (<code>Damage(Type, Max, Min)</code>, <code>Healing</code>, <code>Speed/Paralyze</code>, <code>Summon</code>, <code>Field</code>).</li>
        <li><strong>Delay (Turns):</strong> Spell frequency. <code>: 2</code> = 50% chance/turn (~every 4s), <code>: 6</code> = ~16% chance/turn (~every 12s).</li>
      </ul>
    </div>

    <div class="guide-topic-card">
      <h4>💬 4. Monster Talk Lines & Yells</h4>
      <ul>
        <li><strong>Regular Talk (Say):</strong> Appears in yellow over the creature within normal screen vision.</li>
        <li><strong>Yell (#Y):</strong> Starts with <code>#Y </code>. Appears in <strong>red</strong> to all players across the full game screen (e.g. <code>#Y GROOAAARRR!</code>).</li>
      </ul>
    </div>
  `;
}

// Flags conhecidas do objects.srv
const KNOWN_FLAGS = [
  "Take", "Container", "Chest", "Cumulative", "Bank", "Clip", "Bottom", "Top",
  "Unmove", "Unpass", "Unthrow", "Unlay", "Avoid", "Weapon", "Armor", "Shield",
  "Food", "Rune", "Information", "Text", "Write", "WriteOnce", "LiquidContainer",
  "LiquidSource", "LiquidPool", "TeleportAbsolute", "TeleportRelative", "Key",
  "KeyDoor", "NameDoor", "LevelDoor", "QuestDoor", "Bed", "Disguise", "Height",
  "Light", "Corpse", "Expire", "WearOut", "Bow", "Throw", "Wand", "Ammo"
];

// Flags conhecidas de Monstros
const MONSTER_FLAGS = [
  "KickBoxes", "KickCreatures", "SeeInvisible", "Unpushable", "DistanceFighting",
  "NoSummon", "NoConvince", "NoIllusion", "NoBurning", "NoPoison", "NoEnergy",
  "NoParalyze"
];

// Page Initialization on DOMContentLoaded
document.addEventListener("DOMContentLoaded", async () => {
  setupLanguageSelector();
  setupNavigation();
  setupGlobalSearch();
  setupUnsavedChangesModal();
  setupDirtyTracking();
  setupObjectsTab();
  setupMonstersTab();
  setupNpcsTab();
  setupMoveUseTab();
  setupSpritesTab();
  setupDocsTab();
  setupRuleBuilder();
  setupSettingsTab();
  setupModals();
  setupOutfitControls();
  setupNpcChatSimulator();
  setupLootSimulator();
  setupBackupManager();
  setupMapTab();
  setupQuestWizard();
  setupDiffViewer();
  setupMobileMenu();

  // Atalhos Globais: Ctrl+S (Salvar Atual) e Ctrl+K (Focar Busca Global)
  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
      e.preventDefault();
      document.getElementById("btn-global-save")?.click();
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      document.getElementById("global-search")?.focus();
    }
  });

  setLanguage(state.lang);

  await loadInitialConfig();
  await loadDocs();
  await loadObjects();
  await loadMonsters();
  await loadNpcs();
  await loadMoveUse();
  await loadEffects();
});

function setupLanguageSelector() {
  // English-only application
}

// =============================================================================
// NAVIGATION & TABS
// =============================================================================
function setupNavigation() {
  const navButtons = document.querySelectorAll(".nav-item");
  const tabPanes = document.querySelectorAll(".tab-pane");

  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetTab = btn.getAttribute("data-tab");
      if (state.currentTab === targetTab) return;

      confirmNavigation(() => {
        state.currentTab = targetTab;

        navButtons.forEach(b => b.classList.remove("active"));
        tabPanes.forEach(p => p.classList.remove("active"));

        btn.classList.add("active");
        const activePane = document.getElementById(targetTab);
        if (activePane) activePane.classList.add("active");

        applyTranslationsToDOM();

        if (targetTab === "tab-sprites" && state.sprites.total > 0) {
          renderSpritesGrid();
        }
        if (targetTab === "tab-docs") {
          renderDocsGrid();
        }
        if (targetTab === "tab-map") {
          initMapModule();
        }
        if (targetTab === "tab-settings") {
          loadBackupsList();
        }
      });
    });
  });
}

function setupGlobalSearch() {
  const searchInput = document.getElementById("global-search");
  let searchTimeout = null;

  searchInput.addEventListener("input", (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      const q = e.target.value.trim();
      if (state.currentTab === "tab-objects") {
        state.objects.search = q;
        state.objects.page = 1;
        loadObjects();
      } else if (state.currentTab === "tab-monsters") {
        state.monsters.search = q;
        renderMonstersList();
      } else if (state.currentTab === "tab-npcs") {
        state.npcs.search = q;
        renderNpcsList();
      } else if (state.currentTab === "tab-moveuse") {
        state.moveuse.search = q;
        loadMoveUse();
      } else if (state.currentTab === "tab-docs") {
        state.docs.search = q;
        renderDocsGrid();
      }
    }, 250);
  });

  document.getElementById("btn-reload-data").addEventListener("click", () => {
    confirmNavigation(async () => {
      showToast(t("toast_reloading"), "info");
      await loadInitialConfig();
      await loadObjects();
      await loadMonsters();
      await loadNpcs();
      await loadMoveUse();
      await loadEffects();
      setDirty(false);
      showToast(t("toast_updated"), "success");
    });
  });

  document.getElementById("btn-global-save").addEventListener("click", () => {
    if (state.currentTab === "tab-objects") {
      document.getElementById("btn-save-object").click();
    } else if (state.currentTab === "tab-monsters") {
      document.getElementById("btn-save-monster").click();
    } else if (state.currentTab === "tab-npcs") {
      document.getElementById("btn-save-npc").click();
    } else if (state.currentTab === "tab-moveuse") {
      document.getElementById("btn-save-moveuse").click();
    }
  });
}

// =============================================================================
// CONFIGURATION & INITIAL STATUS
// =============================================================================
function renderConfigStatus() {
  const data = state.config || {};
  const statusUl = document.getElementById("config-status-list");
  if (!statusUl) return;

  statusUl.innerHTML = `
    <li><strong>objects.srv:</strong> ${data.objects_loaded ? `✅ ${t("status_loaded")} (${data.objects_count} ${t("status_types")})` : `❌ ${t("status_not_found")}`}</li>
    <li><strong>moveuse.dat:</strong> ${data.moveuse_loaded ? `✅ ${t("status_loaded")} (${data.moveuse_sections} ${t("status_sections")})` : `❌ ${t("status_not_found")}`}</li>
    <li><strong>${t("nav_monsters")}:</strong> ${data.monsters_loaded ? `✅ ${t("status_loaded")} (${data.monsters_count} ${t("status_creatures")})` : `❌ ${t("status_not_found")}`}</li>
    <li><strong>${t("nav_npcs")}:</strong> ${data.npcs_loaded ? `✅ ${t("status_loaded")} (${data.npcs_count} ${t("status_npcs")})` : `❌ ${t("status_not_found")}`}</li>
    <li><strong>Tibia.spr:</strong> ${data.spr_loaded ? `✅ ${t("status_loaded")} (${data.spr_count} ${t("status_sprites")})` : `⚠️ ${t("status_spr_missing")}`}</li>
    <li><strong>Tibia.dat:</strong> ${data.dat_loaded ? `✅ ${t("status_loaded")} (${data.dat_items} ${t("status_items")}, ${data.dat_creatures} ${t("status_creatures")})` : `⚠️ ${t("status_spr_missing")}`}</li>
  `;
}

async function loadInitialConfig() {
  try {
    const res = await fetch("/api/config");
    const data = await res.json();
    state.config = data;

    document.getElementById("cfg-data-path").value = data.data_path || "";
    document.getElementById("cfg-client-path").value = data.client_path || "";

    // Atualiza Badges
    document.getElementById("badge-objects").innerText = data.objects_count || 0;
    document.getElementById("badge-monsters").innerText = data.monsters_count || 0;
    document.getElementById("badge-npcs").innerText = data.npcs_count || 0;
    document.getElementById("badge-moveuse").innerText = data.moveuse_sections || 0;
    document.getElementById("badge-sprites").innerText = data.spr_count || 0;

    state.sprites.total = data.spr_count || 0;

    renderConfigStatus();
  } catch (err) {
    console.error("Error loading configuration:", err);
  }
}

// =============================================================================
// ABA 1: ITENS (OBJECTS.SRV)
// =============================================================================
function setupObjectsTab() {
  const flagsContainer = document.getElementById("flags-container");
  flagsContainer.innerHTML = KNOWN_FLAGS.map(flag => `
    <label class="flag-checkbox-label">
      <input type="checkbox" name="obj-flag" value="${flag}">
      ${flag}
    </label>
  `).join("");

  document.getElementById("obj-flag-filter").addEventListener("change", (e) => {
    const val = e.target.value;
    confirmNavigation(() => {
      state.objects.flag = val;
      state.objects.page = 1;
      loadObjects();
    });
  });

  document.getElementById("btn-prev-page").addEventListener("click", () => {
    if (state.objects.page > 1) {
      confirmNavigation(() => {
        state.objects.page--;
        loadObjects();
      });
    }
  });

  document.getElementById("btn-next-page").addEventListener("click", () => {
    confirmNavigation(() => {
      state.objects.page++;
      loadObjects();
    });
  });

  document.getElementById("btn-new-object").addEventListener("click", () => {
    confirmNavigation(() => {
      clearObjectForm();
      setDirty(false);
      showToast(t("obj_title_create"), "info");
    });
  });

  document.getElementById("btn-save-object").addEventListener("click", saveCurrentObject);
  document.getElementById("btn-delete-object").addEventListener("click", deleteCurrentObject);

  document.getElementById("obj-type-id").addEventListener("input", (e) => {
    const tid = parseInt(e.target.value) || 0;
    document.getElementById("obj-typeid-badge").innerText = `TypeID: ${tid}`;
    document.getElementById("obj-sprite-img").src = `/api/item_sprite/${tid}?zoom=3&t=${Date.now()}`;
  });
}

async function loadObjects() {
  try {
    const { page, limit, search, flag } = state.objects;
    const url = `/api/objects?page=${page}&limit=${limit}&q=${encodeURIComponent(search)}&flag=${encodeURIComponent(flag)}`;
    const res = await fetch(url);
    const data = await res.json();

    state.objects.total = data.total;
    document.getElementById("obj-total-counter").innerText = `${data.total} ${t("lbl_items_count")}`;
    document.getElementById("page-indicator").innerText = `${t("lbl_page")} ${data.page} / ${data.pages || 1}`;

    const listContainer = document.getElementById("objects-list");
    listContainer.innerHTML = data.items.map(item => `
      <div class="list-item-card ${state.objects.selectedTypeID === item.type_id ? 'selected' : ''}" data-typeid="${item.type_id}">
        <div class="item-thumb">
          <img src="/api/item_sprite/${item.type_id}?zoom=1" alt="${item.name}" loading="lazy">
        </div>
        <div class="item-info">
          <div class="item-name">${item.name || t("obj_unnamed")}</div>
          <div class="item-meta">
            <span>ID: ${item.type_id}</span>
            <span>${item.flags.slice(0, 2).join(", ")}</span>
          </div>
        </div>
      </div>
    `).join("");

    listContainer.querySelectorAll(".list-item-card").forEach(el => {
      el.addEventListener("click", () => {
        const typeId = parseInt(el.getAttribute("data-typeid"));
        if (state.objects.selectedTypeID === typeId) return;
        confirmNavigation(() => selectObject(typeId));
      });
    });

    if (data.items.length > 0 && state.objects.selectedTypeID === null) {
      selectObject(data.items[0].type_id);
    }
  } catch (err) {
    console.error("Error loading items list:", err);
  }
}

async function selectObject(typeId) {
  state.objects.selectedTypeID = typeId;
  document.querySelectorAll("#objects-list .list-item-card").forEach(c => {
    c.classList.toggle("selected", parseInt(c.getAttribute("data-typeid")) === typeId);
  });

  try {
    const res = await fetch(`/api/objects/${typeId}`);
    if (!res.ok) return;
    const item = await res.json();

    document.getElementById("obj-type-id").value = item.type_id;
    document.getElementById("obj-typeid-badge").innerText = `TypeID: ${item.type_id}`;
    document.getElementById("obj-name").value = item.name || "";
    document.getElementById("obj-description").value = item.description || "";
    document.getElementById("obj-comment").value = item.comment || "";

    document.getElementById("obj-sprite-img").src = `/api/item_sprite/${item.type_id}?zoom=3&t=${Date.now()}`;

    // Numeric attributes
    const attrs = item.attributes || {};
    document.getElementById("attr-weight").value = attrs.Weight !== undefined ? attrs.Weight : "";
    document.getElementById("attr-capacity").value = attrs.Capacity !== undefined ? attrs.Capacity : "";
    document.getElementById("attr-attack").value = attrs.WeaponAttackValue !== undefined ? attrs.WeaponAttackValue : "";
    document.getElementById("attr-defend").value = attrs.WeaponDefendValue !== undefined ? attrs.WeaponDefendValue : "";
    document.getElementById("attr-armor").value = attrs.ArmorValue !== undefined ? attrs.ArmorValue : "";
    document.getElementById("attr-nutrition").value = attrs.Nutrition !== undefined ? attrs.Nutrition : "";
    document.getElementById("attr-waypoints").value = attrs.Waypoints !== undefined ? attrs.Waypoints : "";
    document.getElementById("attr-totalexpire").value = attrs.TotalExpireTime !== undefined ? attrs.TotalExpireTime : "";

    const commonKeys = ["Weight", "Capacity", "WeaponAttackValue", "WeaponDefendValue", "ArmorValue", "Nutrition", "Waypoints", "TotalExpireTime"];
    const otherAttrs = [];
    for (const [k, v] of Object.entries(attrs)) {
      if (!commonKeys.includes(k)) {
        otherAttrs.push(`${k}=${v}`);
      }
    }
    document.getElementById("obj-raw-attrs").value = otherAttrs.join(", ");

    const flagsSet = new Set(item.flags || []);
    document.querySelectorAll("input[name='obj-flag']").forEach(chk => {
      chk.checked = flagsSet.has(chk.value);
    });

    setDirty(false);
  } catch (err) {
    console.error("Error selecting object:", err);
  }
}

function clearObjectForm() {
  state.objects.selectedTypeID = null;
  document.querySelectorAll("#objects-list .list-item-card").forEach(c => c.classList.remove("selected"));

  document.getElementById("obj-type-id").value = "";
  document.getElementById("obj-typeid-badge").innerText = `TypeID: ${t("obj_typeid_new")}`;
  document.getElementById("obj-name").value = "";
  document.getElementById("obj-description").value = "";
  document.getElementById("obj-comment").value = "";
  document.getElementById("obj-sprite-img").src = `/api/item_sprite/0?zoom=3`;

  document.getElementById("attr-weight").value = "";
  document.getElementById("attr-capacity").value = "";
  document.getElementById("attr-attack").value = "";
  document.getElementById("attr-defend").value = "";
  document.getElementById("attr-armor").value = "";
  document.getElementById("attr-nutrition").value = "";
  document.getElementById("attr-waypoints").value = "";
  document.getElementById("attr-totalexpire").value = "";
  document.getElementById("obj-raw-attrs").value = "";

  document.querySelectorAll("input[name='obj-flag']").forEach(chk => chk.checked = false);
}

async function saveCurrentObject() {
  const typeId = parseInt(document.getElementById("obj-type-id").value);
  if (isNaN(typeId) || typeId < 0) {
    showToast(t("toast_invalid_typeid"), "error");
    return false;
  }

  const flags = [];
  document.querySelectorAll("input[name='obj-flag']:checked").forEach(chk => flags.push(chk.value));

  const attributes = {};
  const weight = document.getElementById("attr-weight").value.trim();
  if (weight) attributes["Weight"] = parseInt(weight);

  const cap = document.getElementById("attr-capacity").value.trim();
  if (cap) attributes["Capacity"] = parseInt(cap);

  const atk = document.getElementById("attr-attack").value.trim();
  if (atk) attributes["WeaponAttackValue"] = parseInt(atk);

  const def = document.getElementById("attr-defend").value.trim();
  if (def) attributes["WeaponDefendValue"] = parseInt(def);

  const arm = document.getElementById("attr-armor").value.trim();
  if (arm) attributes["ArmorValue"] = parseInt(arm);

  const nut = document.getElementById("attr-nutrition").value.trim();
  if (nut) attributes["Nutrition"] = parseInt(nut);

  const way = document.getElementById("attr-waypoints").value.trim();
  if (way) attributes["Waypoints"] = parseInt(way);

  const exp = document.getElementById("attr-totalexpire").value.trim();
  if (exp) attributes["TotalExpireTime"] = parseInt(exp);

  const rawOther = document.getElementById("obj-raw-attrs").value.trim();
  if (rawOther) {
    rawOther.split(",").forEach(pair => {
      if (pair.includes("=")) {
        const [k, v] = pair.split("=");
        const key = k.trim();
        const val = v.trim();
        attributes[key] = isNaN(val) ? val : Number(val);
      }
    });
  }

  const payload = {
    type_id: typeId,
    name: document.getElementById("obj-name").value.trim(),
    description: document.getElementById("obj-description").value.trim(),
    comment: document.getElementById("obj-comment").value.trim(),
    flags: flags,
    attributes: attributes
  };

  try {
    const res = await fetch("/api/objects/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const result = await res.json();
    if (result.success) {
      showToast(`${t("toast_item_saved")} (ID: ${typeId})`, "success");
      setDirty(false);
      await loadObjects();
      selectObject(typeId);
      return true;
    } else {
      showToast(result.error || t("toast_error_save_item"), "error");
      return false;
    }
  } catch (err) {
    showToast(t("toast_net_error_save_item"), "error");
    return false;
  }
}

async function deleteCurrentObject() {
  const typeId = state.objects.selectedTypeID;
  if (!typeId) return;

  if (!confirm(`${t("confirm_delete_item")} ${typeId}?`)) return;

  try {
    const res = await fetch("/api/objects/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type_id: typeId })
    });
    const result = await res.json();
    if (result.success) {
      showToast(`${t("toast_item_deleted")} (ID: ${typeId})`, "success");
      clearObjectForm();
      loadObjects();
    }
  } catch (err) {
    showToast(t("toast_error_delete_item"), "error");
  }
}

// =============================================================================
// ABA 2: MONSTROS (.MON) COM EDITOR VISUAL DE MAGIAS E FALAS
// =============================================================================
let currentMonsterLoot = [];
let currentMonsterSpells = [];
let currentMonsterTalk = [];
let editingSpellIndex = null;

function setupMonstersTab() {
  const flagsContainer = document.getElementById("mon-flags-container");
  flagsContainer.innerHTML = MONSTER_FLAGS.map(flag => `
    <label class="flag-checkbox-label">
      <input type="checkbox" name="mon-flag" value="${flag}">
      ${flag}
    </label>
  `).join("");

  document.getElementById("btn-add-loot-item").addEventListener("click", () => {
    openItemPickerModal(t("modal_pick_loot"), (item) => {
      currentMonsterLoot.push({
        item_id: item.type_id,
        count: 1,
        chance: 100,
        percentage: 10.0
      });
      setDirty(true);
      renderLootTable();
    });
  });

  document.getElementById("btn-save-monster").addEventListener("click", saveCurrentMonster);
  document.getElementById("btn-new-monster").addEventListener("click", () => {
    confirmNavigation(() => {
      clearMonsterForm();
      setDirty(false);
    });
  });

  // Monster Filters and Sorting
  const monSearchInput = document.getElementById("mon-filter-search");
  if (monSearchInput) {
    monSearchInput.addEventListener("input", (e) => {
      state.monsters.search = e.target.value.trim().toLowerCase();
      renderMonstersList();
    });
  }

  const monSortSelect = document.getElementById("mon-sort-by");
  if (monSortSelect) {
    monSortSelect.addEventListener("change", (e) => {
      state.monsters.sortBy = e.target.value;
      renderMonstersList();
    });
  }

  const monSortDirBtn = document.getElementById("btn-mon-sort-dir");
  if (monSortDirBtn) {
    monSortDirBtn.addEventListener("click", () => {
      state.monsters.sortOrder = (state.monsters.sortOrder === "asc") ? "desc" : "asc";
      const icon = document.getElementById("mon-sort-dir-icon");
      if (icon) {
        icon.innerText = state.monsters.sortOrder === "asc" ? t("btn_sort_asc") : t("btn_sort_desc");
      }
      renderMonstersList();
    });
  }

  window.updateMonsterPreview = function() {
    const outfit = parseInt(document.getElementById("mon-outfit").value) || 0;
    const corpse = parseInt(document.getElementById("mon-corpse")?.value) || 0;
    const colors = document.getElementById("mon-colors").value.trim() || "0-0-0-0";
    const dir = (state.outfits && state.outfits.mon) ? state.outfits.mon.dir : 2;
    const anim = (state.outfits && state.outfits.mon) ? state.outfits.mon.anim : 0;
    const img = document.getElementById("mon-sprite-img");
    if (img) {
      if (outfit === 0 && corpse > 0) {
        img.src = `/api/item_sprite/${corpse}?zoom=3&t=${Date.now()}`;
      } else {
        img.src = `/api/outfit_sprite/${outfit}?dir=${dir}&anim=${anim}&zoom=3&colors=${encodeURIComponent(colors)}&t=${Date.now()}`;
      }
    }
  };

  document.getElementById("mon-outfit").addEventListener("input", updateMonsterPreview);
  document.getElementById("mon-colors").addEventListener("input", updateMonsterPreview);

  // Real-Time Combat Metrics Listeners
  ["mon-hp", "mon-atk", "mon-armor", "mon-flee"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", updateMonsterCombatSummary);
  });

  // Corpse Picker
  const corpseInput = document.getElementById("mon-corpse");
  const corpseImg = document.getElementById("mon-corpse-img");
  const updateCorpseImg = () => {
    const cId = parseInt(corpseInput.value) || 0;
    if (cId > 0 && corpseImg) {
      corpseImg.src = `/api/item_sprite/${cId}?zoom=1&t=${Date.now()}`;
    }
  };
  corpseInput.addEventListener("input", () => {
    updateCorpseImg();
    if (typeof window.updateMonsterPreview === "function") window.updateMonsterPreview();
  });

  const btnPickCorpse = document.getElementById("btn-pick-corpse");
  if (btnPickCorpse) {
    btnPickCorpse.addEventListener("click", () => {
      openItemPickerModal(t("modal_pick_corpse"), (item) => {
        corpseInput.value = item.type_id;
        updateCorpseImg();
        setDirty(true);
      }, "corpse");
    });
  }

  // Spells & Talk Buttons
  const btnAddSpell = document.getElementById("btn-add-monster-spell");
  if (btnAddSpell) {
    btnAddSpell.addEventListener("click", () => openMonsterSpellModal(null));
  }

  const btnAddTalk = document.getElementById("btn-add-monster-talk");
  if (btnAddTalk) {
    btnAddTalk.addEventListener("click", () => {
      currentMonsterTalk.push("GROOAAARRR!");
      setDirty(true);
      renderMonsterTalkList();
    });
  }

  setupMonsterSpellModal();
  setupCombatGuideModal();
}

function updateMonsterCombatSummary() {
  const hp = parseInt(document.getElementById("mon-hp").value) || 0;
  const atk = parseInt(document.getElementById("mon-atk").value) || 0;
  const armor = parseInt(document.getElementById("mon-armor").value) || 0;
  const flee = parseInt(document.getElementById("mon-flee").value) || 0;

  const avgMelee = (atk / 2).toFixed(1);
  const avgArmor = (armor * 0.75).toFixed(1);
  const fleePct = hp > 0 ? Math.min(100, Math.round((flee / hp) * 100)) : 0;

  let maxSpellsDmg = 0;
  currentMonsterSpells.forEach(s => {
    const sp = parseMonsterSpell(s);
    if (sp.impact === "Damage") {
      maxSpellsDmg += (sp.impactParam2 || 0);
    }
  });

  const totalCombo = atk + maxSpellsDmg;

  const avgMeleeEl = document.getElementById("summary-avg-melee");
  if (avgMeleeEl) avgMeleeEl.innerText = avgMelee;

  const avgArmorEl = document.getElementById("summary-avg-armor");
  if (avgArmorEl) avgArmorEl.innerText = avgArmor;

  const fleeEl = document.getElementById("summary-flee-pct");
  if (fleeEl) fleeEl.innerText = `${fleePct}% (${flee} HP)`;

  const comboEl = document.getElementById("summary-max-combo");
  if (comboEl) comboEl.innerText = `${totalCombo} (${t("summary_combo_melee")}: ${atk} + ${t("summary_combo_spells")}: ${maxSpellsDmg})`;
}

function setupCombatGuideModal() {
  const modal = document.getElementById("monster-combat-guide-modal");
  const btnOpen = document.getElementById("btn-mon-combat-guide");
  const btnClose = document.getElementById("btn-close-combat-guide");
  const btnCloseFooter = document.getElementById("btn-close-combat-guide-footer");

  if (btnOpen) {
    btnOpen.addEventListener("click", () => {
      const curAtk = parseInt(document.getElementById("mon-atk").value) || 50;
      document.getElementById("sim-mon-atk").value = curAtk;
      modal.classList.add("active");
    });
  }

  if (btnClose) btnClose.addEventListener("click", () => modal.classList.remove("active"));
  if (btnCloseFooter) btnCloseFooter.addEventListener("click", () => modal.classList.remove("active"));

  const btnSim = document.getElementById("btn-run-damage-sim");
  if (btnSim) {
    btnSim.addEventListener("click", () => {
      const atk = parseInt(document.getElementById("sim-mon-atk").value) || 0;
      const def = parseInt(document.getElementById("sim-target-def").value) || 0;
      const armor = parseInt(document.getElementById("sim-target-armor").value) || 0;

      let totalDmg = 0;
      let maxDmg = 0;
      let blocks = 0;
      const rounds = 100;

      for (let i = 0; i < rounds; i++) {
        const rawAttack = Math.floor(Math.random() * (atk + 1));
        const shieldDef = Math.floor(Math.random() * (def + 1));
        const afterShield = Math.max(0, rawAttack - shieldDef);

        if (afterShield <= 0) {
          blocks++;
          continue;
        }

        const halfArmor = Math.floor(armor / 2);
        const armorAbsorb = halfArmor + Math.floor(Math.random() * (halfArmor + 1));
        const finalDmg = Math.max(0, afterShield - armorAbsorb);

        if (finalDmg <= 0) {
          blocks++;
        } else {
          totalDmg += finalDmg;
          if (finalDmg > maxDmg) maxDmg = finalDmg;
        }
      }

      const hits = rounds - blocks;
      const avgDmg = (totalDmg / rounds).toFixed(1);
      const blockRate = Math.round((blocks / rounds) * 100);
      const hitRate = Math.round((hits / rounds) * 100);

      document.getElementById("sim-avg-dmg").innerText = avgDmg;
      document.getElementById("sim-max-dmg").innerText = maxDmg;
      document.getElementById("sim-block-rate").innerText = `${blockRate}%`;
      document.getElementById("sim-hit-rate").innerText = `${hitRate}%`;
      document.getElementById("sim-results-output").style.display = "block";
    });
  }
}

async function loadMonsters() {
  try {
    const res = await fetch("/api/monsters");
    const data = await res.json();
    state.monsters.list = data.monsters;
    renderMonstersList();
  } catch (err) {
    console.error("Error loading monsters:", err);
  }
}

function renderMonstersList() {
  const listContainer = document.getElementById("monsters-list");
  if (!listContainer) return;
  const q = (state.monsters.search || "").toLowerCase();

  let filtered = state.monsters.list.filter(m => {
    if (!q) return true;
    const nameMatch = (m.name || "").toLowerCase().includes(q);
    const fileMatch = (m.filename || "").toLowerCase().includes(q);
    const raceMatch = String(m.race_number || "").includes(q);
    return nameMatch || fileMatch || raceMatch;
  });

  const sortBy = state.monsters.sortBy || "name";
  const sortOrder = state.monsters.sortOrder || "asc";

  filtered.sort((a, b) => {
    let cmp = 0;
    if (sortBy === "name") {
      cmp = (a.name || "").localeCompare(b.name || "");
    } else if (sortBy === "race") {
      cmp = (a.race_number || 0) - (b.race_number || 0);
    } else if (sortBy === "hp") {
      cmp = (a.hitpoints || 0) - (b.hitpoints || 0);
    } else if (sortBy === "exp") {
      cmp = (a.experience || 0) - (b.experience || 0);
    } else if (sortBy === "atk") {
      cmp = (a.attack || 0) - (b.attack || 0);
    }
    return sortOrder === "desc" ? -cmp : cmp;
  });

  listContainer.innerHTML = filtered.map(m => `
    <div class="list-item-card ${state.monsters.selectedFilename === m.filename ? 'selected' : ''}" data-file="${m.filename}">
      <div class="item-thumb">
        <img src="${(m.outfit_type === 0 && (m.corpse || 0) > 0) ? `/api/item_sprite/${m.corpse}?zoom=1` : `/api/outfit_sprite/${m.outfit_type}?zoom=1&colors=${encodeURIComponent(m.outfit_colors || '0-0-0-0')}`}" alt="${m.name}" loading="lazy">
      </div>
      <div class="item-info">
        <div class="item-name">${m.name}</div>
        <div class="item-meta">
          <span class="badge-race">Race: #${m.race_number}</span>
          <span>HP: ${m.hitpoints}</span>
          <span>XP: ${m.experience}</span>
        </div>
      </div>
    </div>
  `).join("");

  listContainer.querySelectorAll(".list-item-card").forEach(el => {
    el.addEventListener("click", () => {
      const filename = el.getAttribute("data-file");
      if (state.monsters.selectedFilename === filename) return;
      confirmNavigation(() => selectMonster(filename));
    });
  });

  if (filtered.length > 0 && state.monsters.selectedFilename === null) {
    selectMonster(filtered[0].filename);
  }
}

async function selectMonster(filename) {
  state.monsters.selectedFilename = filename;
  document.querySelectorAll("#monsters-list .list-item-card").forEach(c => {
    c.classList.toggle("selected", c.getAttribute("data-file") === filename);
  });

  try {
    const res = await fetch(`/api/monsters/${encodeURIComponent(filename)}`);
    if (!res.ok) return;
    const m = await res.json();

    document.getElementById("monster-title").innerText = `${t("mon_title_edit")} ${m.name} (${m.filename})`;
    document.getElementById("mon-name").value = m.name;
    document.getElementById("mon-race").value = m.race_number;
    document.getElementById("mon-race-badge").innerText = `Race: ${m.race_number}`;
    document.getElementById("mon-outfit").value = m.outfit_type;
    const colors = m.outfit_colors || "0-0-0-0";
    document.getElementById("mon-colors").value = colors;

    document.getElementById("mon-hp").value = m.hitpoints;
    document.getElementById("mon-exp").value = m.experience;
    document.getElementById("mon-atk").value = m.attack;
    document.getElementById("mon-def").value = m.defend;
    document.getElementById("mon-armor").value = m.armor;
    document.getElementById("mon-speed").value = m.speed;
    document.getElementById("mon-blood").value = m.blood || "Blood";
    document.getElementById("mon-flee").value = m.flee_threshold;
    document.getElementById("mon-poison").value = m.poison || 0;

    const corpseId = m.corpse || 0;
    document.getElementById("mon-corpse").value = corpseId;
    const corpseImg = document.getElementById("mon-corpse-img");
    if (corpseImg) {
      corpseImg.src = `/api/item_sprite/${corpseId || 4025}?zoom=1&t=${Date.now()}`;
    }

    updateMonsterPreview();

    const flagsSet = new Set(m.flags || []);
    document.querySelectorAll("input[name='mon-flag']").forEach(chk => {
      chk.checked = flagsSet.has(chk.value);
    });

    currentMonsterSpells = m.spells_raw || [];
    currentMonsterTalk = m.talk || [];
    currentMonsterLoot = m.inventory || [];

    renderLootTable();
    renderMonsterSpellsList();
    renderMonsterTalkList();
    updateMonsterCombatSummary();
    setDirty(false);
  } catch (err) {
    console.error("Error loading monster details:", err);
  }
}

// ---- Tabela de Loot ----
function renderLootTable() {
  const tbody = document.getElementById("loot-table-body");
  if (currentMonsterLoot.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 1rem;">${t("no_loot_registered")}</td></tr>`;
    return;
  }

  tbody.innerHTML = currentMonsterLoot.map((item, idx) => `
    <tr>
      <td>
        <div class="loot-item-cell">
          <div class="loot-item-thumb">
            <img src="/api/item_sprite/${item.item_id}?zoom=1" alt="item">
          </div>
          <span>Item #${item.item_id}</span>
        </div>
      </td>
      <td>
        <input type="number" style="width: 80px;" value="${item.item_id}" onchange="updateLootItem(${idx}, 'item_id', this.value)">
      </td>
      <td>
        <input type="number" style="width: 70px;" value="${item.count}" min="1" max="100" onchange="updateLootItem(${idx}, 'count', this.value)">
      </td>
      <td>
        <input type="number" style="width: 90px;" value="${item.chance}" min="1" max="1000" onchange="updateLootItem(${idx}, 'chance', this.value)">
      </td>
      <td>
        <strong>${(item.chance / 10).toFixed(1)}%</strong>
      </td>
      <td>
        <button class="btn btn-xs btn-danger" onclick="removeLootItem(${idx})">${t("btn_remove")}</button>
      </td>
    </tr>
  `).join("");
}

window.updateLootItem = function(idx, field, val) {
  if (currentMonsterLoot[idx]) {
    currentMonsterLoot[idx][field] = parseInt(val) || 0;
    setDirty(true);
    renderLootTable();
  }
};

window.removeLootItem = function(idx) {
  currentMonsterLoot.splice(idx, 1);
  setDirty(true);
  renderLootTable();
};

// ---- Editor de Magias de Monstros ----
function parseMonsterSpell(spellStr) {
  const clean = spellStr.trim();
  const res = {
    raw: clean,
    shape: "Origin",
    shapeParam1: 0,
    shapeParam2: 21,
    impact: "Damage",
    impactParam1: 4,
    impactParam2: 450,
    impactParam3: 50,
    delay: 6,
    magicEffect: 21
  };

  const delayM = clean.match(/:\s*(\d+)\s*$/);
  if (delayM) res.delay = parseInt(delayM[1]);

  const shapeM = clean.match(/^([A-Za-z]+)\s*\(([^)]+)\)/);
  if (shapeM) {
    res.shape = shapeM[1];
    const sParts = shapeM[2].split(",").map(s => parseInt(s.trim()) || 0);
    res.shapeParam1 = sParts[0] || 0;
    res.shapeParam2 = sParts[1] || 0;
    if (res.shape === "Actor") res.magicEffect = sParts[0] || 1;
    else if (res.shape === "Origin") res.magicEffect = sParts[1] || 1;
    else if (res.shape === "Victim") res.magicEffect = sParts[2] || sParts[1] || 1;
  }

  const impactM = clean.match(/->\s*([A-Za-z]+)\s*\(([^)]+)\)/);
  if (impactM) {
    res.impact = impactM[1];
    const iParts = impactM[2].split(",").map(s => parseInt(s.trim()) || 0);
    res.impactParam1 = iParts[0] || 0;
    res.impactParam2 = iParts[1] || 0;
    res.impactParam3 = iParts[2] || 0;
  }

  return res;
}

function renderMonsterSpellsList() {
  const container = document.getElementById("mon-spells-container");
  if (!container) return;

  if (currentMonsterSpells.length === 0) {
    container.innerHTML = `<tr><td colspan="4" style="color:var(--text-muted);font-size:0.8rem;padding:12px;text-align:center;">${t("no_spells_registered")}</td></tr>`;
    return;
  }

  container.innerHTML = currentMonsterSpells.map((sStr, idx) => {
    const sp = parseMonsterSpell(sStr);
    let typeClass = "damage";
    let descText = "";

    const dmgNames = {
      1: t("dmg_name_physical"),
      4: t("dmg_name_fire"),
      8: t("dmg_name_poison"),
      16: t("dmg_name_energy"),
      32: t("dmg_name_death"),
      64: t("dmg_name_manadrain"),
      128: t("dmg_name_holy"),
      256: t("dmg_name_drown")
    };

    if (sp.impact === "Damage") {
      typeClass = "damage";
      const dmgName = dmgNames[sp.impactParam1] || `Tipo ${sp.impactParam1}`;
      descText = `${t("spell_lbl_damage")} ${dmgName}: ${sp.impactParam3} ${t("spell_lbl_to")} ${sp.impactParam2} • ${t("spell_lbl_turns")}: ${sp.delay} (~${Math.round(100 / (sp.delay || 1))}%)`;
    } else if (sp.impact === "Healing") {
      typeClass = "healing";
      descText = `${t("spell_lbl_heal")}: +${sp.impactParam2} ${t("spell_lbl_to")} +${sp.impactParam1} HP • ${t("spell_lbl_turns")}: ${sp.delay}`;
    } else if (sp.impact === "Speed") {
      typeClass = "speed";
      const mode = sp.impactParam1 < 0 ? "Paralyze" : "Haste";
      descText = `${mode}: ${sp.impactParam1} (${sp.impactParam2}s) • ${t("spell_lbl_turns")}: ${sp.delay}`;
    } else if (sp.impact === "Summon") {
      typeClass = "summon";
      descText = `${t("spell_lbl_summon")} #${sp.impactParam1} (${t("spell_lbl_to")} ${sp.impactParam2} ${t("spell_lbl_minions")}) • ${t("spell_lbl_turns")}: ${sp.delay}`;
    } else {
      typeClass = "damage";
      descText = `${sp.impact} • ${t("spell_lbl_turns")}: ${sp.delay}`;
    }

    return `
      <tr>
        <td style="text-align:center;width:56px;">
          <div class="spell-thumb-box" title="Effect #${Number(sp.magicEffect) || 0}" style="margin:0 auto;">
            <img src="/api/effect_sprite/${Number(sp.magicEffect) || 1}?zoom=1" alt="eff_${Number(sp.magicEffect) || 0}">
          </div>
        </td>
        <td>
          <span class="spell-type-badge ${typeClass}">${escapeHtmlText(sp.impact)}</span>
          <div style="margin-top:4px;font-size:0.8rem;">${escapeHtmlText(sp.shape)}</div>
        </td>
        <td class="spell-params-summary">${escapeHtmlText(descText)}</td>
        <td style="white-space:nowrap;text-align:center;">
          <button class="btn btn-xs btn-secondary" onclick="openMonsterSpellModal(${idx})">✏️</button>
          <button class="btn btn-xs btn-danger" onclick="removeMonsterSpell(${idx})">✕</button>
        </td>
      </tr>
    `;
  }).join("");
}

window.removeMonsterSpell = function(idx) {
  currentMonsterSpells.splice(idx, 1);
  setDirty(true);
  renderMonsterSpellsList();
  updateMonsterCombatSummary();
};

// ---- Editor de Falas (Talk) com Toggle Grito / Fala Normal ----
function renderMonsterTalkList() {
  const container = document.getElementById("mon-talk-container");
  if (!container) return;

  if (currentMonsterTalk.length === 0) {
    container.innerHTML = `<tr><td colspan="3" style="color:var(--text-muted);font-size:0.8rem;padding:12px;text-align:center;">${t("no_talk_registered")}</td></tr>`;
    return;
  }

  container.innerHTML = currentMonsterTalk.map((line, idx) => {
    const isYell = line.startsWith("#Y ") || line.startsWith("#y ");
    const cleanText = isYell ? line.replace(/^#[Yy]\s*/, "") : line;

    return `
      <tr>
        <td style="width:90px;text-align:center;">
          <button class="btn-yell-toggle ${isYell ? 'is-yell' : ''}" onclick="toggleMonsterTalkYell(${idx})" title="${t("badge_yell")} / ${t("badge_say")}">
            ${isYell ? t("badge_yell") : t("badge_say")}
          </button>
        </td>
        <td>
          <input type="text" class="talk-input-text" value="${escapeHtmlText(cleanText).replace(/"/g, '&quot;')}" oninput="updateMonsterTalkText(${idx}, this.value)" placeholder="${t("placeholder_talk")}">
        </td>
        <td style="text-align:center;width:50px;">
          <button class="btn btn-xs btn-danger" onclick="removeMonsterTalk(${idx})">✕</button>
        </td>
      </tr>
    `;
  }).join("");
}

window.toggleMonsterTalkYell = function(idx) {
  const cur = currentMonsterTalk[idx] || "";
  const isYell = cur.startsWith("#Y ") || cur.startsWith("#y ");
  const clean = isYell ? cur.replace(/^#[Yy]\s*/, "") : cur;
  currentMonsterTalk[idx] = isYell ? clean : `#Y ${clean}`;
  setDirty(true);
  renderMonsterTalkList();
};

window.updateMonsterTalkText = function(idx, text) {
  const cur = currentMonsterTalk[idx] || "";
  const isYell = cur.startsWith("#Y ") || cur.startsWith("#y ");
  currentMonsterTalk[idx] = isYell ? `#Y ${text.trim()}` : text.trim();
  setDirty(true);
};

window.removeMonsterTalk = function(idx) {
  currentMonsterTalk.splice(idx, 1);
  setDirty(true);
  renderMonsterTalkList();
};

// ---- Modal Construtor de Magia de Monstro ----
function setupMonsterSpellModal() {
  const modal = document.getElementById("monster-spell-modal");
  document.getElementById("btn-close-mon-spell").addEventListener("click", () => modal.classList.remove("active"));
  document.getElementById("btn-cancel-mon-spell").addEventListener("click", () => modal.classList.remove("active"));

  const impactSelect = document.getElementById("spell-impact-type");
  const shapeSelect = document.getElementById("spell-shape-type");

  const updateSpellFieldsVisibility = () => {
    const imp = impactSelect.value;
    document.getElementById("spell-damage-fields").style.display = imp === "Damage" ? "grid" : "none";
    document.getElementById("spell-healing-fields").style.display = imp === "Healing" ? "grid" : "none";
    document.getElementById("spell-speed-fields").style.display = imp === "Speed" ? "grid" : "none";
    document.getElementById("spell-summon-fields").style.display = imp === "Summon" ? "grid" : "none";
    document.getElementById("spell-field-fields").style.display = imp === "Field" ? "grid" : "none";
    document.getElementById("spell-drunken-fields").style.display = imp === "Drunken" ? "grid" : "none";
    updateMonsterSpellCodePreview();
  };

  impactSelect.addEventListener("change", updateSpellFieldsVisibility);
  shapeSelect.addEventListener("change", updateMonsterSpellCodePreview);

  // Inputs listeners
  [
    "spell-damage-type", "spell-damage-min", "spell-damage-max",
    "spell-heal-min", "spell-heal-max",
    "spell-speed-val", "spell-speed-dur", "spell-speed-eff",
    "spell-summon-race", "spell-summon-count",
    "spell-field-item", "spell-drunk-intensity", "spell-drunk-duration", "spell-drunk-effect",
    "spell-magic-effect", "spell-missile-effect", "spell-delay"
  ].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", updateMonsterSpellCodePreview);
  });

  // Pick spell effect
  const btnPickEff = document.getElementById("btn-pick-spell-effect");
  const effInput = document.getElementById("spell-magic-effect");
  const effPreviewImg = document.getElementById("spell-effect-preview-img");

  if (btnPickEff) {
    btnPickEff.addEventListener("click", () => {
      openEffectPickerModal((eff) => {
        effInput.value = eff.id;
        effPreviewImg.src = `/api/effect_sprite/${eff.id}?zoom=1&t=${Date.now()}`;
        updateMonsterSpellCodePreview();
      });
    });
  }

  effInput.addEventListener("input", () => {
    const val = parseInt(effInput.value) || 1;
    effPreviewImg.src = `/api/effect_sprite/${val}?zoom=1&t=${Date.now()}`;
  });

  document.getElementById("btn-confirm-mon-spell").addEventListener("click", saveMonsterSpellFromModal);
}

function updateMonsterSpellCodePreview() {
  const shape = document.getElementById("spell-shape-type").value;
  const impact = document.getElementById("spell-impact-type").value;
  const magicEff = parseInt(document.getElementById("spell-magic-effect").value) || 21;
  const missile = parseInt(document.getElementById("spell-missile-effect").value) || 0;
  const delay = parseInt(document.getElementById("spell-delay").value) || 6;

  let shapeCode = "";
  if (shape === "Actor") {
    shapeCode = `Actor (${magicEff})`;
  } else if (shape === "Origin") {
    shapeCode = `Origin (${missile}, ${magicEff})`;
  } else if (shape === "Victim") {
    shapeCode = `Victim (${missile}, 7, ${magicEff})`;
  } else if (shape === "Destination") {
    shapeCode = `Destination (0, ${missile}, 7, ${magicEff})`;
  } else if (shape === "Angle") {
    shapeCode = `Angle (3, 7, ${magicEff})`;
  }

  let impactCode = "";
  if (impact === "Damage") {
    const dmgType = parseInt(document.getElementById("spell-damage-type").value) || 4;
    const minDmg = parseInt(document.getElementById("spell-damage-min").value) || 0;
    const maxDmg = parseInt(document.getElementById("spell-damage-max").value) || 100;
    impactCode = `Damage (${dmgType}, ${maxDmg}, ${minDmg})`;
  } else if (impact === "Healing") {
    const minHeal = parseInt(document.getElementById("spell-heal-min").value) || 10;
    const maxHeal = parseInt(document.getElementById("spell-heal-max").value) || 50;
    impactCode = `Healing (${maxHeal}, ${minHeal})`;
  } else if (impact === "Speed") {
    const spdVal = parseInt(document.getElementById("spell-speed-val").value) || -50;
    const spdDur = parseInt(document.getElementById("spell-speed-dur").value) || 10;
    const spdEff = parseInt(document.getElementById("spell-speed-eff").value) || 25;
    impactCode = `Speed (${spdVal}, ${spdDur}, ${spdEff})`;
  } else if (impact === "Summon") {
    const sRace = parseInt(document.getElementById("spell-summon-race").value) || 82;
    const sCount = parseInt(document.getElementById("spell-summon-count").value) || 3;
    impactCode = `Summon (${sRace}, ${sCount})`;
  } else if (impact === "Field") {
    const fItem = parseInt(document.getElementById("spell-field-item").value) || 1487;
    impactCode = `Field (${fItem})`;
  } else if (impact === "Drunken") {
    const dInt = parseInt(document.getElementById("spell-drunk-intensity").value) || 50;
    const dDur = parseInt(document.getElementById("spell-drunk-duration").value) || 15;
    const dEff = parseInt(document.getElementById("spell-drunk-effect").value) || 11;
    impactCode = `Drunken (${dInt}, ${dDur}, ${dEff})`;
  }

  const fullCode = `${shapeCode} -> ${impactCode} : ${delay}`;
  document.getElementById("mon-spell-code-output").innerText = fullCode;
  return fullCode;
}

window.openMonsterSpellModal = function(editIdx) {
  editingSpellIndex = editIdx;
  const modal = document.getElementById("monster-spell-modal");
  modal.classList.add("active");

  if (editIdx !== null && currentMonsterSpells[editIdx]) {
    const sp = parseMonsterSpell(currentMonsterSpells[editIdx]);
    document.getElementById("spell-shape-type").value = sp.shape || "Origin";
    document.getElementById("spell-impact-type").value = sp.impact || "Damage";
    document.getElementById("spell-magic-effect").value = sp.magicEffect || 21;
    document.getElementById("spell-missile-effect").value = sp.shapeParam1 || 0;
    document.getElementById("spell-delay").value = sp.delay || 6;

    if (sp.impact === "Damage") {
      document.getElementById("spell-damage-type").value = sp.impactParam1 || 4;
      document.getElementById("spell-damage-max").value = sp.impactParam2 || 100;
      document.getElementById("spell-damage-min").value = sp.impactParam3 || 0;
    } else if (sp.impact === "Healing") {
      document.getElementById("spell-heal-max").value = sp.impactParam1 || 50;
      document.getElementById("spell-heal-min").value = sp.impactParam2 || 10;
    } else if (sp.impact === "Speed") {
      document.getElementById("spell-speed-val").value = sp.impactParam1 || -50;
      document.getElementById("spell-speed-dur").value = sp.impactParam2 || 10;
      document.getElementById("spell-speed-eff").value = sp.impactParam3 || 25;
    } else if (sp.impact === "Summon") {
      document.getElementById("spell-summon-race").value = sp.impactParam1 || 82;
      document.getElementById("spell-summon-count").value = sp.impactParam2 || 3;
    }
  } else {
    document.getElementById("spell-shape-type").value = "Origin";
    document.getElementById("spell-impact-type").value = "Damage";
    document.getElementById("spell-damage-type").value = "4";
    document.getElementById("spell-damage-min").value = "50";
    document.getElementById("spell-damage-max").value = "450";
    document.getElementById("spell-magic-effect").value = "21";
    document.getElementById("spell-missile-effect").value = "4";
    document.getElementById("spell-delay").value = "6";
  }

  document.getElementById("spell-effect-preview-img").src = `/api/effect_sprite/${document.getElementById("spell-magic-effect").value || 21}?zoom=1`;
  document.getElementById("spell-impact-type").dispatchEvent(new Event("change"));
};

function saveMonsterSpellFromModal() {
  const generatedCode = updateMonsterSpellCodePreview();
  if (editingSpellIndex !== null) {
    currentMonsterSpells[editingSpellIndex] = generatedCode;
  } else {
    currentMonsterSpells.push(generatedCode);
  }

  document.getElementById("monster-spell-modal").classList.remove("active");
  setDirty(true);
  renderMonsterSpellsList();
  updateMonsterCombatSummary();
}

function clearMonsterForm() {
  state.monsters.selectedFilename = null;
  document.querySelectorAll("#monsters-list .list-item-card").forEach(c => c.classList.remove("selected"));

  document.getElementById("monster-title").innerText = t("mon_title_create");
  document.getElementById("mon-name").value = "";
  document.getElementById("mon-race").value = "0";
  document.getElementById("mon-race-badge").innerText = `Race: ${t("mon_race_new")}`;
  document.getElementById("mon-outfit").value = "0";
  document.getElementById("mon-colors").value = "0-0-0-0";
  document.getElementById("mon-hp").value = "100";
  document.getElementById("mon-exp").value = "50";
  document.getElementById("mon-atk").value = "10";
  document.getElementById("mon-def").value = "10";
  document.getElementById("mon-armor").value = "5";
  document.getElementById("mon-speed").value = "50";
  document.getElementById("mon-blood").value = "Blood";
  document.getElementById("mon-corpse").value = "4025";
  document.getElementById("mon-flee").value = "0";
  document.getElementById("mon-poison").value = "0";

  document.querySelectorAll("input[name='mon-flag']").forEach(chk => chk.checked = false);
  currentMonsterLoot = [];
  currentMonsterSpells = [];
  currentMonsterTalk = [];

  renderLootTable();
  renderMonsterSpellsList();
  renderMonsterTalkList();
  updateMonsterCombatSummary();
}

async function saveCurrentMonster() {
  const name = document.getElementById("mon-name").value.trim();
  if (!name) {
    showToast(t("toast_warn_monster_name"), "error");
    return false;
  }

  const filename = state.monsters.selectedFilename || `${name.toLowerCase().replace(/[^a-z0-9]/g, '')}.mon`;

  const flags = [];
  document.querySelectorAll("input[name='mon-flag']:checked").forEach(chk => flags.push(chk.value));

  const payload = {
    filename: filename,
    name: name,
    race_number: parseInt(document.getElementById("mon-race").value) || 0,
    outfit_type: parseInt(document.getElementById("mon-outfit").value) || 0,
    outfit_colors: document.getElementById("mon-colors").value.trim() || "0-0-0-0",
    hitpoints: parseInt(document.getElementById("mon-hp").value) || 100,
    experience: parseInt(document.getElementById("mon-exp").value) || 0,
    attack: parseInt(document.getElementById("mon-atk").value) || 0,
    defend: parseInt(document.getElementById("mon-def").value) || 0,
    armor: parseInt(document.getElementById("mon-armor").value) || 0,
    speed: parseInt(document.getElementById("mon-speed").value) || 50,
    blood: document.getElementById("mon-blood").value || "Blood",
    corpse: parseInt(document.getElementById("mon-corpse").value) || 0,
    flee_threshold: parseInt(document.getElementById("mon-flee").value) || 0,
    poison: parseInt(document.getElementById("mon-poison").value) || 0,
    flags: flags,
    spells_raw: currentMonsterSpells,
    talk: currentMonsterTalk,
    inventory: currentMonsterLoot
  };

  try {
    const res = await fetch("/api/monsters/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const result = await res.json();
    if (result.success) {
      showToast(`${t("toast_monster_saved")} (${name})`, "success");
      setDirty(false);
      await loadMonsters();
      selectMonster(filename);
      return true;
    } else {
      showToast(result.error || t("toast_error_save_monster"), "error");
      return false;
    }
  } catch (err) {
    showToast(t("toast_error_save_monster"), "error");
    return false;
  }
}

// =============================================================================
// TAB 3: NPCS (.NPC) - TIBIA PALETTE & DIALOGUE BUILDER
// =============================================================================
const TIBIA_PALETTE_HEX = [
  "FFFFFF", "FFD4BF", "FFE9BF", "FFFFBF", "E9FFBF", "D4FFBF",
  "BFFFBF", "BFFFD4", "BFFFE9", "BFFFFF", "BFE9FF", "BFD4FF",
  "BFBFFF", "D4BFFF", "E9BFFF", "FFBFFF", "FFBFE9", "FFBFD4",
  "FFBFBF", "DADADA", "BF9F8F", "BFAF8F", "BFBF8F", "AFBF8F",
  "9FBF8F", "8FBF8F", "8FBF9F", "8FBFAF", "8FBFBF", "8FAFBF",
  "8F9FBF", "8F8FBF", "9F8FBF", "AF8FBF", "BF8FBF", "BF8FAF",
  "BF8F9F", "BF8F8F", "B6B6B6", "BF7F5F", "BFAF8F", "BFBF5F",
  "9FBF5F", "7FBF5F", "5FBF5F", "5FBF7F", "5FBF9F", "5FBFBF",
  "5F9FBF", "5F7FBF", "5F5FBF", "7F5FBF", "9F5FBF", "BF5FBF",
  "BF5F9F", "BF5F7F", "BF5F5F", "919191", "BF6A3F", "BF943F",
  "BFBF3F", "94BF3F", "6ABF3F", "3FBF3F", "3FBF6A", "3FBF94",
  "3FBFBF", "3F94BF", "3F6ABF", "3F3FBF", "6A3FBF", "943FBF",
  "BF3FBF", "BF3F94", "BF3F6A", "BF3F3F", "6D6D6D", "FF5500",
  "FFAA00", "FFFF00", "AAFF00", "54FF00", "00FF00", "00FF54",
  "00FFAA", "00FFFF", "00A9FF", "0055FF", "0000FF", "5500FF",
  "A900FF", "FE00FF", "FF00AA", "FF0055", "FF0000", "484848",
  "BF3F00", "BF7F00", "BFBF00", "7FBF00", "3FBF00", "00BF00",
  "00BF3F", "00BF7F", "00BFBF", "007FBF", "003FBF", "0000BF",
  "3F00BF", "7F00BF", "BF00BF", "BF007F", "BF003F", "BF0000",
  "242424", "7F2A00", "7F5500", "7F7F00", "557F00", "2A7F00",
  "007F00", "007F2A", "007F55", "007F7F", "00547F", "002A7F",
  "00007F", "2A007F", "54007F", "7F007F", "7F0055", "7F002A",
  "7F0000"
];

const KNOWN_NDBS = [
  { file: "gen-bank.ndb", name: "🏦 Bank & Deposits (gen-bank.ndb)" },
  { file: "gen-post.ndb", name: "📫 Correio & Parcels (gen-post.ndb)" },
  { file: "gen-t-runes-free-s.ndb", name: "📜 Runas Free (gen-t-runes-free-s.ndb)" },
  { file: "gen-t-runes-prem-s.ndb", name: "✨ Runas Premmy (gen-t-runes-prem-s.ndb)" },
  { file: "gen-t-wands-free-s.ndb", name: "🪄 Wands & Rods Free (gen-t-wands-free-s.ndb)" },
  { file: "gen-t-wands-prem-s.ndb", name: "🌟 Wands & Rods Premmy (gen-t-wands-prem-s.ndb)" },
  { file: "gen-t-weapon-s.ndb", name: "⚔️ Armas Gerais (gen-t-weapon-s.ndb)" },
  { file: "gen-t-armor-s.ndb", name: "🛡️ Armaduras (gen-t-armor-s.ndb)" },
  { file: "gen-t-helm-s.ndb", name: "🪖 Capacetes (gen-t-helm-s.ndb)" },
  { file: "gen-t-shield-s.ndb", name: "🛡️ Escudos (gen-t-shield-s.ndb)" },
  { file: "gen-t-legs-s.ndb", name: "👖 Legs / Trousers (gen-t-legs-s.ndb)" },
  { file: "gen-t-fruit-s.ndb", name: "🍎 Frutas & Comida (gen-t-fruit-s.ndb)" },
  { file: "gen-t-furniture-chairs-s.ndb", name: "🪑 Furniture & Chairs (gen-t-furniture-chairs-s.ndb)" },
  { file: "gen-t-distance-s.ndb", name: "🏹 Arcos & Flechas (gen-t-distance-s.ndb)" },
  { file: "gen-t-gems-s.ndb", name: "💎 Gemas & Joias (gen-t-gems-s.ndb)" }
];

let activeNpcPalettePart = "head"; // "head" | "body" | "legs" | "feet"
let currentNpcKeywords = [];
let currentNpcNdbs = new Set();
let currentNpcActiveSecTab = "dialogues";

function parseOutfitColors(colorsStr) {
  if (!colorsStr) return { head: 0, body: 0, legs: 0, feet: 0 };
  const parts = String(colorsStr).match(/\d+/g) || [];
  return {
    head: parseInt(parts[0]) || 0,
    body: parseInt(parts[1]) || 0,
    legs: parseInt(parts[2]) || 0,
    feet: parseInt(parts[3]) || 0
  };
}

function formatOutfitColors(obj) {
  return `${obj.head}-${obj.body}-${obj.legs}-${obj.feet}`;
}

function initNpcColorPalette() {
  const container = document.getElementById("npc-palette-swatches");
  if (!container) return;

  container.innerHTML = TIBIA_PALETTE_HEX.map((hex, idx) => `
    <div class="palette-swatch" data-color-idx="${idx}" style="background-color: #${hex};" title="Cor #${idx}"></div>
  `).join("");

  container.querySelectorAll(".palette-swatch").forEach(el => {
    el.addEventListener("click", () => {
      const idx = parseInt(el.getAttribute("data-color-idx"));
      const curColors = parseOutfitColors(document.getElementById("npc-colors").value);
      
      curColors[activeNpcPalettePart] = idx;
      const newStr = formatOutfitColors(curColors);
      document.getElementById("npc-colors").value = newStr;

      setDirty(true);
      updateNpcSpritePreview();
      syncNpcPaletteSelection();
    });
  });

  const partTabs = [
    { id: "tab-pal-head", part: "head", label: "Head" },
    { id: "tab-pal-primary", part: "body", label: "Primary" },
    { id: "tab-pal-secondary", part: "legs", label: "Secondary" },
    { id: "tab-pal-detail", part: "feet", label: "Detail" }
  ];

  partTabs.forEach(({ id, part, label }) => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener("click", () => {
        activeNpcPalettePart = part;
        document.querySelectorAll(".tibia-palette-tabs .palette-tab").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        
        const partLbl = document.getElementById("lbl-palette-active-part");
        if (partLbl) partLbl.innerText = label;

        syncNpcPaletteSelection();
      });
    }
  });

  const btnRandom = document.getElementById("btn-npc-random-colors");
  if (btnRandom) {
    btnRandom.addEventListener("click", () => {
      const rH = Math.floor(Math.random() * 133);
      const rB = Math.floor(Math.random() * 133);
      const rL = Math.floor(Math.random() * 133);
      const rF = Math.floor(Math.random() * 133);
      document.getElementById("npc-colors").value = `${rH}-${rB}-${rL}-${rF}`;
      setDirty(true);
      updateNpcSpritePreview();
      syncNpcPaletteSelection();
    });
  }

  const btnReset = document.getElementById("btn-npc-reset-colors");
  if (btnReset) {
    btnReset.addEventListener("click", () => {
      document.getElementById("npc-colors").value = "0-0-0-0";
      setDirty(true);
      updateNpcSpritePreview();
      syncNpcPaletteSelection();
    });
  }
}

function syncNpcPaletteSelection() {
  const colors = parseOutfitColors(document.getElementById("npc-colors").value);
  const activeVal = colors[activeNpcPalettePart] || 0;

  const valBadge = document.getElementById("lbl-palette-color-val");
  if (valBadge) valBadge.innerText = `#${activeVal}`;

  document.querySelectorAll("#npc-palette-swatches .palette-swatch").forEach(el => {
    const idx = parseInt(el.getAttribute("data-color-idx"));
    el.classList.toggle("active", idx === activeVal);
  });
}

function updateNpcSpritePreview() {
  const outfitInput = document.getElementById("npc-outfit");
  const outfitRaw = outfitInput ? outfitInput.value.trim() : "128";
  const outfit = (outfitRaw !== "" && !isNaN(outfitRaw)) ? parseInt(outfitRaw) : 128;
  const colors = (document.getElementById("npc-colors")?.value || "").trim();
  const dir = (state.outfits && state.outfits.npc) ? state.outfits.npc.dir : 2;
  const anim = (state.outfits && state.outfits.npc) ? state.outfits.npc.anim : 0;
  const img = document.getElementById("npc-sprite-img");
  const badge = document.getElementById("npc-outfit-badge");
  const pickBtn = document.getElementById("btn-pick-npc-item");
  const dirToolbar = document.getElementById("npc-dir-toolbar");
  const paletteSec = document.getElementById("npc-tibia-palette");

  const isItemOutfit = (outfit === 0);
  if (isItemOutfit) {
    const itemId = parseInt(colors) || 0;
    if (badge) badge.innerText = itemId > 0 ? `${t("badge_item_outfit_label")}: #${itemId}` : `${t("badge_item_outfit_label")}: (0)`;
    if (pickBtn) pickBtn.style.display = "inline-block";
    if (dirToolbar) dirToolbar.style.opacity = "0.35";
    if (paletteSec) paletteSec.style.opacity = "0.45";
    if (img) {
      img.src = `/api/outfit_sprite/0?zoom=3&colors=${encodeURIComponent(colors)}&t=${Date.now()}`;
    }
  } else {
    if (badge) badge.innerText = `LookType: ${outfit}`;
    if (pickBtn) pickBtn.style.display = "none";
    if (dirToolbar) dirToolbar.style.opacity = "1";
    if (paletteSec) paletteSec.style.opacity = "1";
    if (img) {
      img.src = `/api/outfit_sprite/${outfit}?dir=${dir}&anim=${anim}&zoom=3&colors=${encodeURIComponent(colors || "0-0-0-0")}&t=${Date.now()}`;
    }
  }
}

// ---- NPC Dialogues & Behaviour ----
function initNpcBehaviourTabs() {
  const secTabs = [
    { btnId: "btn-tab-npc-dialogues", paneId: "npc-pane-dialogues", key: "dialogues" },
    { btnId: "btn-tab-npc-ndb", paneId: "npc-pane-ndb", key: "ndb" },
    { btnId: "btn-tab-npc-raw", paneId: "npc-pane-raw", key: "raw" },
    { btnId: "btn-tab-npc-simulator", paneId: "npc-pane-simulator", key: "simulator" }
  ];

  secTabs.forEach(({ btnId, paneId, key }) => {
    const btn = document.getElementById(btnId);
    if (btn) {
      btn.addEventListener("click", () => {
        // Se estava saindo de visual, compila para raw
        if (currentNpcActiveSecTab !== "raw" && key === "raw") {
          generateNpcBehaviourFromUI();
        } else if (currentNpcActiveSecTab === "raw" && key !== "raw") {
          const rawLines = document.getElementById("npc-behaviour").value.split("\n").map(s => s.trim()).filter(Boolean);
          parseNpcBehaviourToUI(rawLines);
        }

        if (key === "simulator") {
          const curName = document.getElementById("npc-name")?.value || "NPC";
          const simNameEl = document.getElementById("chat-sim-npc-name");
          if (simNameEl) simNameEl.innerText = curName;
        }

        currentNpcActiveSecTab = key;
        document.querySelectorAll(".section-tabs-bar .sec-tab-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        document.querySelectorAll(".npc-behaviour-section .npc-sec-pane").forEach(p => p.style.display = "none");
        const pane = document.getElementById(paneId);
        if (pane) pane.style.display = "block";
      });
    }
  });

  // Checkboxes NDB
  const ndbContainer = document.getElementById("npc-ndb-checkboxes");
  if (ndbContainer) {
    ndbContainer.innerHTML = KNOWN_NDBS.map(mod => `
      <label class="ndb-module-chip">
        <input type="checkbox" data-ndb="${mod.file}" onchange="toggleNpcNdb('${mod.file}', this.checked)">
        <span>${mod.name}</span>
      </label>
    `).join("");
  }

  // Add Rule Button
  const btnAddKw = document.getElementById("btn-add-npc-keyword");
  if (btnAddKw) {
    btnAddKw.addEventListener("click", () => {
      addNpcKeywordRule({
        keywords: `"job"`,
        condition: "",
        response: "I am a helpful NPC.",
        actions: ""
      });
    });
  }
}

window.toggleNpcNdb = function(ndbFile, isChecked) {
  if (isChecked) {
    currentNpcNdbs.add(ndbFile);
  } else {
    currentNpcNdbs.delete(ndbFile);
  }
  setDirty(true);
  generateNpcBehaviourFromUI();
};

function renderNpcKeywordRulesTable() {
  const tbody = document.getElementById("npc-rules-tbody");
  if (!tbody) return;

  if (currentNpcKeywords.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;color:var(--text-muted);padding:1rem;">${t("npc_no_keywords")}</td></tr>`;
    return;
  }

  tbody.innerHTML = currentNpcKeywords.map((rule, idx) => `
    <tr>
      <td>
        <input type="text" value="${(rule.keywords || '').replace(/"/g, '&quot;')}" placeholder='"job" ou "life","fluid"' oninput="updateNpcKeywordRule(${idx}, 'keywords', this.value)">
      </td>
      <td>
        <input type="text" value="${(rule.condition || '').replace(/"/g, '&quot;')}" placeholder='Topic=1 ou CountMoney>=Price' oninput="updateNpcKeywordRule(${idx}, 'condition', this.value)">
      </td>
      <td>
        <input type="text" value="${(rule.response || '').replace(/"/g, '&quot;')}" placeholder='Texto falado pelo NPC' oninput="updateNpcKeywordRule(${idx}, 'response', this.value)">
      </td>
      <td>
        <input type="text" value="${(rule.actions || '').replace(/"/g, '&quot;')}" placeholder='Topic=1, DeleteMoney, etc.' oninput="updateNpcKeywordRule(${idx}, 'actions', this.value)">
      </td>
      <td style="text-align:center;">
        <button type="button" class="btn btn-xs btn-danger" onclick="removeNpcKeywordRule(${idx})">✕</button>
      </td>
    </tr>
  `).join("");
}

window.addNpcKeywordRule = function(rule) {
  currentNpcKeywords.push(rule);
  setDirty(true);
  renderNpcKeywordRulesTable();
  generateNpcBehaviourFromUI();
};

window.removeNpcKeywordRule = function(idx) {
  currentNpcKeywords.splice(idx, 1);
  setDirty(true);
  renderNpcKeywordRulesTable();
  generateNpcBehaviourFromUI();
};

window.updateNpcKeywordRule = function(idx, field, val) {
  if (currentNpcKeywords[idx]) {
    currentNpcKeywords[idx][field] = val;
    setDirty(true);
    generateNpcBehaviourFromUI();
  }
};

function parseNpcBehaviourToUI(lines) {
  let greeting = "";
  let farewell = "";
  let busy = "";
  let vanish = "";
  let aggressive = "";
  currentNpcKeywords = [];
  currentNpcNdbs = new Set();

  lines.forEach(line => {
    const s = line.trim();
    if (!s || s.startsWith("#")) return;

    if (s.startsWith("@")) {
      const match = s.match(/@"([^"]+)"/);
      if (match) currentNpcNdbs.add(match[1]);
      return;
    }

    if (s.startsWith("ADDRESS,") || s.startsWith("ADDRESS ")) {
      if (s.includes('"hello$"') || s.includes('"hi$"')) {
        const m = s.match(/->\s*"([^"]*)"/);
        if (m) greeting = m[1];
      }
      return;
    }

    if (s.startsWith("BUSY,") || s.startsWith("BUSY ")) {
      if (s.includes('"hello$"') || s.includes('"hi$"')) {
        const m = s.match(/->\s*"([^"]*)"/);
        if (m) busy = m[1];
      }
      return;
    }

    if (s.startsWith("VANISH,")) {
      const m = s.match(/->\s*"([^"]*)"/);
      if (m) vanish = m[1];
      return;
    }

    if (s.startsWith('"bye"') || s.startsWith('"farewell"')) {
      const m = s.match(/->\s*"([^"]*)"/);
      if (m) farewell = m[1];
      return;
    }

    if (s.startsWith("->")) {
      aggressive = s.replace(/^->\s*/, "");
      return;
    }

    // General dialogue rule: Trigger -> Response / Actions
    if (s.includes("->")) {
      const [left, right] = s.split("->").map(p => p.trim());
      
      let condition = "";
      let keywords = left;
      
      // If left side has Topic or Condition
      if (left.includes("Topic=") || left.includes("Count") || left.includes("Price") || left.includes("Quest")) {
        const parts = left.split(",");
        const kwParts = [];
        const condParts = [];
        parts.forEach(p => {
          const pt = p.trim();
          if (pt.startsWith('"') || pt.startsWith("%")) {
            kwParts.push(pt);
          } else {
            condParts.push(pt);
          }
        });
        keywords = kwParts.join(", ");
        condition = condParts.join(", ");
      }

      // Extract quoted response and actions on right side
      let responseText = "";
      let actionsText = "";
      
      const respMatch = right.match(/"([^"]*)"/);
      if (respMatch) {
        responseText = respMatch[1];
        actionsText = right.replace(`"${responseText}"`, "").replace(/^,\s*|,\s*$/g, "").trim();
      } else {
        actionsText = right;
      }

      currentNpcKeywords.push({
        keywords: keywords,
        condition: condition,
        response: responseText,
        actions: actionsText
      });
    }
  });

  // Update form fields
  const elGreet = document.getElementById("npc-greet-input");
  if (elGreet) elGreet.value = greeting;

  const elFarewell = document.getElementById("npc-farewell-input");
  if (elFarewell) elFarewell.value = farewell;

  const elBusy = document.getElementById("npc-busy-input");
  if (elBusy) elBusy.value = busy;

  const elVanish = document.getElementById("npc-vanish-input");
  if (elVanish) elVanish.value = vanish;

  const elAggressive = document.getElementById("npc-aggressive-input");
  if (elAggressive) elAggressive.value = aggressive;

  // Atualiza checkboxes NDB
  document.querySelectorAll("#npc-ndb-checkboxes input[type='checkbox']").forEach(chk => {
    const f = chk.getAttribute("data-ndb");
    chk.checked = currentNpcNdbs.has(f);
  });

  renderNpcKeywordRulesTable();
}

function generateNpcBehaviourFromUI() {
  const greeting = (document.getElementById("npc-greet-input")?.value || "").trim();
  const farewell = (document.getElementById("npc-farewell-input")?.value || "").trim();
  const busy = (document.getElementById("npc-busy-input")?.value || "").trim();
  const vanish = (document.getElementById("npc-vanish-input")?.value || "").trim();
  const aggressive = (document.getElementById("npc-aggressive-input")?.value || "").trim();

  const lines = [];

  // Fala agressiva / sem trigger
  if (aggressive) {
    lines.push(`-> ${aggressive}`);
  }

  // Standard GIMUD greetings
  if (greeting) {
    lines.push(`ADDRESS,"hello$",! -> "${greeting}"`);
    lines.push(`ADDRESS,"hi$",!    -> *`);
    lines.push(`ADDRESS,!          -> Idle`);
  }

  if (busy) {
    lines.push(`BUSY,"hello$",!    -> "${busy}", Queue`);
    lines.push(`BUSY,"hi$",!       -> *`);
    lines.push(`BUSY,!             -> NOP`);
  }

  if (farewell) {
    lines.push(`"bye"      -> "${farewell}", Idle`);
    lines.push(`"farewell" -> *`);
  }

  // Regras customizadas de palavras-chave
  currentNpcKeywords.forEach(r => {
    const kw = (r.keywords || "").trim();
    const cond = (r.condition || "").trim();
    const resp = (r.response || "").trim();
    const act = (r.actions || "").trim();

    if (!kw && !cond && !resp && !act) return;

    let left = "";
    if (cond && kw) left = `${cond},${kw}`;
    else if (cond) left = cond;
    else left = kw;

    let rightParts = [];
    if (resp) rightParts.push(`"${resp}"`);
    if (act) rightParts.push(act);

    const right = rightParts.join(", ");
    if (left && right) {
      lines.push(`${left} -> ${right}`);
    }
  });

  // Included NDB modules
  currentNpcNdbs.forEach(ndb => {
    lines.push(`@"${ndb}"`);
  });

  const fullScript = lines.join("\n");
  const behTextarea = document.getElementById("npc-behaviour");
  if (behTextarea) {
    behTextarea.value = fullScript;
  }
  return fullScript;
}

function setupNpcsTab() {
  document.getElementById("btn-save-npc").addEventListener("click", saveCurrentNpc);
  document.getElementById("btn-new-npc").addEventListener("click", () => {
    confirmNavigation(() => {
      clearNpcForm();
      setDirty(false);
    });
  });

  const npcSearchInput = document.getElementById("npc-filter-search");
  if (npcSearchInput) {
    npcSearchInput.addEventListener("input", (e) => {
      state.npcs.search = e.target.value.trim().toLowerCase();
      renderNpcsList();
    });
  }

  const npcFilterType = document.getElementById("npc-filter-type");
  if (npcFilterType) {
    npcFilterType.addEventListener("change", (e) => {
      state.npcs.filterType = e.target.value;
      renderNpcsList();
    });
  }

  const btnPickNpcItem = document.getElementById("btn-pick-npc-item");
  if (btnPickNpcItem) {
    btnPickNpcItem.addEventListener("click", () => {
      openItemPickerModal(t("modal_select_item_outfit"), (item) => {
        document.getElementById("npc-outfit").value = 0;
        document.getElementById("npc-colors").value = String(item.type_id);
        updateNpcSpritePreview();
        setDirty(true);
      });
    });
  }

  document.getElementById("npc-outfit").addEventListener("input", updateNpcSpritePreview);
  document.getElementById("npc-colors").addEventListener("input", () => {
    updateNpcSpritePreview();
    syncNpcPaletteSelection();
  });

  // Dialogue inputs trigger synchronization
  ["npc-greet-input", "npc-farewell-input", "npc-busy-input", "npc-vanish-input", "npc-aggressive-input"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", generateNpcBehaviourFromUI);
  });

  initNpcColorPalette();
  initNpcBehaviourTabs();
}

async function loadNpcs() {
  try {
    const res = await fetch("/api/npcs");
    const data = await res.json();
    state.npcs.list = data.npcs;
    renderNpcsList();
  } catch (err) {
    console.error("Error loading NPCs:", err);
  }
}

function renderNpcsList() {
  const listContainer = document.getElementById("npcs-list");
  if (!listContainer) return;
  const q = (state.npcs.search || "").toLowerCase();
  const filterType = state.npcs.filterType || "all";

  const filtered = state.npcs.list.filter(n => {
    const isItem = (n.outfit_type === 0);
    if (filterType === "creatures" && isItem) return false;
    if (filterType === "items" && !isItem) return false;

    if (!q) return true;
    const nameMatch = (n.name || "").toLowerCase().includes(q);
    const fileMatch = (n.filename || "").toLowerCase().includes(q);
    const outfitMatch = String(n.outfit_type || "").includes(q);
    const colorsMatch = String(n.outfit_colors || "").includes(q);
    return nameMatch || fileMatch || outfitMatch || colorsMatch;
  });

  listContainer.innerHTML = filtered.map(n => {
    const isItem = (n.outfit_type === 0);
    const badgeHtml = isItem
      ? `<span class="badge-item-outfit">📦 Item #${n.outfit_colors}</span>`
      : `<span>Look: #${n.outfit_type}</span>`;

    return `
      <div class="list-item-card ${state.npcs.selectedFilename === n.filename ? 'selected' : ''}" data-file="${n.filename}">
        <div class="item-thumb">
          <img src="/api/outfit_sprite/${n.outfit_type}?zoom=1&colors=${encodeURIComponent(n.outfit_colors || '0-0-0-0')}" alt="${n.name}" loading="lazy">
        </div>
        <div class="item-info">
          <div class="item-name">${n.name}</div>
          <div class="item-meta">
            ${badgeHtml}
            <span>${n.behaviour_count} ${t("lbl_lines")}</span>
          </div>
        </div>
      </div>
    `;
  }).join("");

  listContainer.querySelectorAll(".list-item-card").forEach(el => {
    el.addEventListener("click", () => {
      const filename = el.getAttribute("data-file");
      if (state.npcs.selectedFilename === filename) return;
      confirmNavigation(() => selectNpc(filename));
    });
  });

  if (filtered.length > 0 && state.npcs.selectedFilename === null) {
    selectNpc(filtered[0].filename);
  }
}

async function selectNpc(filename) {
  state.npcs.selectedFilename = filename;
  document.querySelectorAll("#npcs-list .list-item-card").forEach(c => {
    c.classList.toggle("selected", c.getAttribute("data-file") === filename);
  });

  try {
    const res = await fetch(`/api/npcs/${encodeURIComponent(filename)}`);
    if (!res.ok) return;
    const n = await res.json();

    document.getElementById("npc-title").innerText = `${t("npc_title_edit")} ${n.name} (${n.filename})`;
    document.getElementById("npc-name").value = n.name;
    document.getElementById("npc-sex").value = n.sex;
    document.getElementById("npc-outfit").value = n.outfit_type;
    document.getElementById("npc-home").value = n.home_pos;
    document.getElementById("npc-radius").value = n.radius;
    const colors = n.outfit_colors || "0-0-0-0";
    document.getElementById("npc-colors").value = colors;

    updateNpcSpritePreview();
    const chatSimNpcName = document.getElementById("chat-sim-npc-name");
    if (chatSimNpcName) chatSimNpcName.innerText = n.name || "NPC";
    document.getElementById("npc-behaviour").value = (n.behaviour_lines || []).join("\n");

    syncNpcPaletteSelection();
    parseNpcBehaviourToUI(n.behaviour_lines || []);
    setDirty(false);
  } catch (err) {
    console.error("Error loading NPC details:", err);
  }
}

function clearNpcForm() {
  state.npcs.selectedFilename = null;
  document.getElementById("npc-title").innerText = t("npc_title_create");
  document.getElementById("npc-name").value = "";
  document.getElementById("npc-sex").value = "male";
  document.getElementById("npc-outfit").value = "128";
  document.getElementById("npc-home").value = "[32000,32000,7]";
  document.getElementById("npc-radius").value = "4";
  document.getElementById("npc-colors").value = "0-0-0-0";
  
  const defaultLines = [
    `ADDRESS,"hello$",! -> "Hello adventurer %N!"`,
    `ADDRESS,"hi$",!    -> *`,
    `ADDRESS,!          -> Idle`,
    `"job" -> "I am an NPC."`,
    `"bye" -> "Good bye.", Idle`
  ];
  document.getElementById("npc-behaviour").value = defaultLines.join("\n");

  syncNpcPaletteSelection();
  parseNpcBehaviourToUI(defaultLines);
}

async function saveCurrentNpc() {
  const name = document.getElementById("npc-name").value.trim();
  if (!name) {
    showToast(t("toast_warn_npc_name"), "error");
    return false;
  }

  // Se estiver em modo visual, compila para o textarea antes de salvar
  if (currentNpcActiveSecTab !== "raw") {
    generateNpcBehaviourFromUI();
  }

  const filename = state.npcs.selectedFilename || `${name.toLowerCase().replace(/[^a-z0-9]/g, '')}.npc`;
  const behLines = document.getElementById("npc-behaviour").value.split("\n").map(s => s.trim()).filter(Boolean);

  const payload = {
    filename: filename,
    name: name,
    sex: document.getElementById("npc-sex").value,
    outfit_type: parseInt(document.getElementById("npc-outfit").value) || 128,
    home_pos: document.getElementById("npc-home").value.trim(),
    radius: parseInt(document.getElementById("npc-radius").value) || 2,
    outfit_colors: document.getElementById("npc-colors").value.trim(),
    behaviour_lines: behLines
  };

  try {
    const res = await fetch("/api/npcs/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const result = await res.json();
    if (result.success) {
      showToast(`${t("toast_npc_saved")} (${name})`, "success");
      setDirty(false);
      await loadNpcs();
      selectNpc(filename);
      return true;
    } else {
      showToast(result.error || t("toast_error_save_npc"), "error");
      return false;
    }
  } catch (err) {
    showToast(t("toast_error_save_npc"), "error");
    return false;
  }
}

// =============================================================================
// ABA 4: MOVEUSE (MOVEUSE.DAT)
// =============================================================================
function setupMoveUseTab() {
  document.getElementById("btn-save-moveuse").addEventListener("click", saveMoveUse);

  document.getElementById("btn-add-moveuse-rule").addEventListener("click", () => {
    const sec = state.moveuse.sections[state.moveuse.selectedSectionIndex];
    const secName = sec ? sec.name : "Geral";
    openRuleBuilderForNew(secName);
  });
}

async function loadMoveUse() {
  try {
    const q = encodeURIComponent(state.moveuse.search);
    const res = await fetch(`/api/moveuse?q=${q}`);
    const data = await res.json();
    state.moveuse.sections = data.sections;
    renderMoveUseSections();
  } catch (err) {
    console.error("Error loading moveuse:", err);
  }
}

function renderMoveUseSections() {
  const container = document.getElementById("moveuse-sections-list");
  container.innerHTML = state.moveuse.sections.map((sec, idx) => `
    <div class="list-item-card ${state.moveuse.selectedSectionIndex === idx ? 'selected' : ''}" data-idx="${idx}">
      <div class="item-info">
        <div class="item-name">${sec.name}</div>
        <div class="item-meta">
          <span>${sec.count} ${t("lbl_rules")}</span>
        </div>
      </div>
    </div>
  `).join("");

  container.querySelectorAll(".list-item-card").forEach(el => {
    el.addEventListener("click", () => {
      const idx = parseInt(el.getAttribute("data-idx"));
      if (state.moveuse.selectedSectionIndex === idx) return;
      confirmNavigation(() => {
        state.moveuse.selectedSectionIndex = idx;
        document.querySelectorAll("#moveuse-sections-list .list-item-card").forEach(c => c.classList.remove("selected"));
        el.classList.add("selected");
        renderMoveUseRules();
      });
    });
  });

  renderMoveUseRules();
}

function renderMoveUseRules() {
  const container = document.getElementById("moveuse-rules-list");
  const sec = state.moveuse.sections[state.moveuse.selectedSectionIndex];

  if (!sec) {
    container.innerHTML = `<p style='color: var(--text-muted);'>${t("no_section_selected")}</p>`;
    return;
  }

  document.getElementById("moveuse-section-title").innerText = `${t("moveuse_rules_of_section")} ${sec.name}`;

  container.innerHTML = sec.rules.map((r, rIdx) => `
    <div class="rule-card" onclick="openRuleBuilderForEdit(${rIdx})">
      <div class="rule-visual">
        <span class="rule-badge">${r.trigger || "Regra"}</span>
        <div class="rule-code">${r.raw}</div>
      </div>
      <div class="rule-item-thumbs">
        ${(r.item_ids || []).slice(0, 3).map(id => `
          <img src="/api/item_sprite/${id}?zoom=1" style="width:24px;height:24px;image-rendering:pixelated;" title="Item #${id}">
        `).join("")}
      </div>
      <button class="btn btn-xs btn-danger" onclick="event.stopPropagation(); deleteMoveUseRule(${rIdx})">✕</button>
    </div>
  `).join("");
}

window.deleteMoveUseRule = function(rIdx) {
  const sec = state.moveuse.sections[state.moveuse.selectedSectionIndex];
  if (sec) {
    sec.rules.splice(rIdx, 1);
    sec.count = sec.rules.length;
    setDirty(true);
    renderMoveUseRules();
  }
};

async function saveMoveUse() {
  try {
    const res = await fetch("/api/moveuse/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sections: state.moveuse.sections })
    });
    const result = await res.json();
    if (result.success) {
      showToast(t("toast_moveuse_saved"), "success");
      setDirty(false);
      return true;
    } else {
      showToast(result.error || t("toast_error_save_moveuse"), "error");
      return false;
    }
  } catch (err) {
    showToast(t("toast_error_save_moveuse"), "error");
    return false;
  }
}

// =============================================================================
// CONSTRUTOR VISUAL DE REGRAS CIPSOFT (MOVE/USE BUILDER)
// =============================================================================
function setupRuleBuilder() {
  const modal = document.getElementById("rule-builder-modal");
  document.getElementById("btn-close-builder").addEventListener("click", () => modal.classList.remove("active"));
  document.getElementById("btn-cancel-builder").addEventListener("click", () => modal.classList.remove("active"));

  document.getElementById("builder-event-type").addEventListener("change", (e) => {
    state.builder.eventType = e.target.value;
    updateBuilderPreview();
  });

  // Conditions Dropdown
  const condSelect = document.getElementById("select-add-condition");
  condSelect.addEventListener("change", (e) => {
    const condId = e.target.value;
    if (!condId) return;
    const def = state.docs.catalog.conditions.find(c => c.id === condId);
    if (def) {
      const initialParams = {};
      (def.params || []).forEach(p => initialParams[p.name] = p.default);
      state.builder.conditions.push({
        id: def.id,
        name: def.name,
        params: initialParams,
        template: def.template,
        invert: false
      });
      renderBuilderConditions();
      updateBuilderPreview();
    }
    condSelect.value = "";
  });

  // Actions Dropdown
  const actSelect = document.getElementById("select-add-action");
  actSelect.addEventListener("change", (e) => {
    const actId = e.target.value;
    if (!actId) return;
    const def = state.docs.catalog.actions.find(a => a.id === actId);
    if (def) {
      const initialParams = {};
      (def.params || []).forEach(p => initialParams[p.name] = p.default);
      state.builder.actions.push({
        id: def.id,
        name: def.name,
        params: initialParams,
        template: def.template
      });
      renderBuilderActions();
      updateBuilderPreview();
    }
    actSelect.value = "";
  });

  document.getElementById("btn-confirm-rule").addEventListener("click", saveBuilderRule);
}

function populateSectionsDatalist() {
  const datalist = document.getElementById("builder-sections-datalist");
  if (datalist) {
    const existing = state.moveuse.sections.map(s => s.name);
    datalist.innerHTML = existing.map(name => `<option value="${name}"></option>`).join("");
  }
}

function openRuleBuilderForNew(sectionName) {
  state.builder.editingSection = sectionName;
  state.builder.editingRuleIndex = null;
  state.builder.eventType = "Use";
  state.builder.conditions = [
    {
      id: "IsType",
      name: "IsType",
      params: { Target: "Obj1", TypeID: 100 },
      template: "IsType ({Target},{TypeID})",
      invert: false
    }
  ];
  state.builder.actions = [
    {
      id: "Effect",
      name: "Effect",
      params: { Target: "Obj1", EffectID: 3 },
      template: "Effect({Target},{EffectID})"
    }
  ];

  document.getElementById("builder-modal-title").innerText = `⚡ ${t("builder_modal_title")} [${sectionName}]`;
  document.getElementById("builder-section-name").value = sectionName;
  document.getElementById("builder-event-type").value = "Use";

  populateSectionsDatalist();
  renderBuilderConditions();
  renderBuilderActions();
  updateBuilderPreview();

  document.getElementById("rule-builder-modal").classList.add("active");
}

function openRuleBuilderForEdit(rIdx) {
  const sec = state.moveuse.sections[state.moveuse.selectedSectionIndex];
  if (!sec || !sec.rules[rIdx]) return;
  const r = sec.rules[rIdx];

  state.builder.editingSection = sec.name;
  state.builder.editingRuleIndex = rIdx;
  state.builder.eventType = r.trigger || "Use";

  document.getElementById("builder-modal-title").innerText = `⚡ ${t("builder_modal_title")} [${sec.name}]`;
  document.getElementById("builder-section-name").value = sec.name;
  document.getElementById("builder-event-type").value = r.trigger || "Use";

  populateSectionsDatalist();

  // Parse conditions
  state.builder.conditions = [];
  if (r.conditions) {
    const rawConds = r.conditions.split(/,\s*(?=[A-Za-z])/);
    rawConds.forEach(cStr => {
      state.builder.conditions.push({
        id: "Custom",
        name: "Condition",
        raw: cStr.trim(),
        template: cStr.trim()
      });
    });
  }

  // Parse actions
  state.builder.actions = [];
  if (r.actions) {
    const rawActs = r.actions.split(/,\s*(?=[A-Za-z])/);
    rawActs.forEach(aStr => {
      state.builder.actions.push({
        id: "Custom",
        name: "Action",
        raw: aStr.trim(),
        template: aStr.trim()
      });
    });
  }

  renderBuilderConditions();
  renderBuilderActions();
  updateBuilderPreview();

  document.getElementById("rule-builder-modal").classList.add("active");
}

function renderBuilderConditions() {
  const container = document.getElementById("builder-conditions-container");
  if (state.builder.conditions.length === 0) {
    container.innerHTML = `<div style="color:var(--text-muted);font-size:0.8rem;padding:6px;">${t("no_cond_added")}</div>`;
    return;
  }

  container.innerHTML = state.builder.conditions.map((c, idx) => {
    if (c.raw) {
      return `
        <div class="builder-chip-row">
          <span class="builder-chip-name">${t("custom_chip")}</span>
          <div class="builder-chip-inputs">
            <input type="text" value="${c.raw}" oninput="state.builder.conditions[${idx}].raw = this.value; updateBuilderPreview();" style="width:100%;">
          </div>
          <button class="btn btn-xs btn-danger" onclick="removeBuilderCondition(${idx})">✕</button>
        </div>
      `;
    }

    const def = state.docs.catalog.conditions.find(cd => cd.id === c.id);
    const inputsHtml = (def ? def.params : []).map(p => {
      const val = c.params[p.name] !== undefined ? c.params[p.name] : p.default;
      if (p.type === "item_id" || p.name === "TypeID" || p.name === "ObjType") {
        return `
          <div style="display:flex;align-items:center;gap:4px;">
            <span>${p.name}:</span>
            <input type="number" style="width:80px;" value="${val}" oninput="state.builder.conditions[${idx}].params['${p.name}'] = this.value; updateBuilderPreview();">
            <button class="btn-builder-picker" title="${t("choose_item_btn")}" onclick="openItemPickerModal('${t("modal_pick_cond_item")}', (item) => { state.builder.conditions[${idx}].params['${p.name}'] = item.type_id; renderBuilderConditions(); updateBuilderPreview(); })">
              <img src="/api/item_sprite/${val || 100}?zoom=1" style="width:18px;height:18px;image-rendering:pixelated;">
            </button>
          </div>
        `;
      } else if (p.type === "target") {
        return `
          <div style="display:flex;align-items:center;gap:4px;">
            <span>${p.name}:</span>
            <select onchange="state.builder.conditions[${idx}].params['${p.name}'] = this.value; updateBuilderPreview();">
              <option value="Obj1" ${val === 'Obj1' ? 'selected' : ''}>Obj1 (Item)</option>
              <option value="Obj2" ${val === 'Obj2' ? 'selected' : ''}>Obj2 (Alvo)</option>
              <option value="User" ${val === 'User' ? 'selected' : ''}>User (Player)</option>
            </select>
          </div>
        `;
      } else {
        return `
          <div style="display:flex;align-items:center;gap:4px;">
            <span>${p.name}:</span>
            <input type="text" value="${val}" oninput="state.builder.conditions[${idx}].params['${p.name}'] = this.value; updateBuilderPreview();">
          </div>
        `;
      }
    }).join("");

    return `
      <div class="builder-chip-row">
        <span class="builder-chip-name">${c.id}</span>
        <div class="builder-chip-inputs">
          ${inputsHtml}
        </div>
        <button class="btn btn-xs btn-danger" onclick="removeBuilderCondition(${idx})">✕</button>
      </div>
    `;
  }).join("");
}

function renderBuilderActions() {
  const container = document.getElementById("builder-actions-container");
  if (state.builder.actions.length === 0) {
    container.innerHTML = `<div style="color:var(--text-muted);font-size:0.8rem;padding:6px;">${t("no_act_added")}</div>`;
    return;
  }

  container.innerHTML = state.builder.actions.map((a, idx) => {
    if (a.raw) {
      return `
        <div class="builder-chip-row">
          <span class="builder-chip-name">${t("custom_chip")}</span>
          <div class="builder-chip-inputs">
            <input type="text" value="${a.raw}" oninput="state.builder.actions[${idx}].raw = this.value; updateBuilderPreview();" style="width:100%;">
          </div>
          <button class="btn btn-xs btn-danger" onclick="removeBuilderAction(${idx})">✕</button>
        </div>
      `;
    }

    const def = state.docs.catalog.actions.find(ad => ad.id === a.id);
    const inputsHtml = (def ? def.params : []).map(p => {
      const val = a.params[p.name] !== undefined ? a.params[p.name] : p.default;

      // Magic Effects Selector
      if (p.name === "EffectID" || p.name === "Effect" || a.id === "Effect") {
        return `
          <div style="display:flex;align-items:center;gap:4px;">
            <span>${p.name}:</span>
            <input type="number" style="width:70px;" value="${val}" min="1" max="25" oninput="state.builder.actions[${idx}].params['${p.name}'] = this.value; updateBuilderPreview();">
            <button class="btn-builder-picker" title="${t("choose_effect_btn")}" onclick="openEffectPickerModal((eff) => { state.builder.actions[${idx}].params['${p.name}'] = eff.id; renderBuilderActions(); updateBuilderPreview(); })">
              <img src="/api/effect_sprite/${val || 1}?zoom=1" style="width:18px;height:18px;image-rendering:pixelated;">
              <span>✨</span>
            </button>
          </div>
        `;
      }
      // Seletor de Itens
      else if (p.type === "item_id" || p.name === "TypeID" || p.name === "NewTypeID" || p.name === "ObjType") {
        return `
          <div style="display:flex;align-items:center;gap:4px;">
            <span>${p.name}:</span>
            <input type="number" style="width:80px;" value="${val}" oninput="state.builder.actions[${idx}].params['${p.name}'] = this.value; updateBuilderPreview();">
            <button class="btn-builder-picker" title="${t("choose_item_btn")}" onclick="openItemPickerModal('${t("modal_pick_act_item")}', (item) => { state.builder.actions[${idx}].params['${p.name}'] = item.type_id; renderBuilderActions(); updateBuilderPreview(); })">
              <img src="/api/item_sprite/${val || 100}?zoom=1" style="width:18px;height:18px;image-rendering:pixelated;">
            </button>
          </div>
        `;
      } else if (p.type === "target") {
        return `
          <div style="display:flex;align-items:center;gap:4px;">
            <span>${p.name}:</span>
            <select onchange="state.builder.actions[${idx}].params['${p.name}'] = this.value; updateBuilderPreview();">
              <option value="Obj1" ${val === 'Obj1' ? 'selected' : ''}>Obj1 (Item)</option>
              <option value="Obj2" ${val === 'Obj2' ? 'selected' : ''}>Obj2 (Alvo)</option>
              <option value="User" ${val === 'User' ? 'selected' : ''}>User (Player)</option>
            </select>
          </div>
        `;
      } else {
        return `
          <div style="display:flex;align-items:center;gap:4px;">
            <span>${p.name}:</span>
            <input type="text" value="${val}" oninput="state.builder.actions[${idx}].params['${p.name}'] = this.value; updateBuilderPreview();">
          </div>
        `;
      }
    }).join("");

    return `
      <div class="builder-chip-row">
        <span class="builder-chip-name">${a.id}</span>
        <div class="builder-chip-inputs">
          ${inputsHtml}
        </div>
        <button class="btn btn-xs btn-danger" onclick="removeBuilderAction(${idx})">✕</button>
      </div>
    `;
  }).join("");
}

window.removeBuilderCondition = function(idx) {
  state.builder.conditions.splice(idx, 1);
  renderBuilderConditions();
  updateBuilderPreview();
};

window.removeBuilderAction = function(idx) {
  state.builder.actions.splice(idx, 1);
  renderBuilderActions();
  updateBuilderPreview();
};

function generateRuleCode() {
  const trigger = state.builder.eventType;

  const condStrings = state.builder.conditions.map(c => {
    if (c.raw) return c.raw;
    let str = c.template || "";
    for (const [k, v] of Object.entries(c.params || {})) {
      str = str.replace(`{${k}}`, v);
    }
    return str;
  });

  const actStrings = state.builder.actions.map(a => {
    if (a.raw) return a.raw;
    let str = a.template || "";
    for (const [k, v] of Object.entries(a.params || {})) {
      str = str.replace(`{${k}}`, v);
    }
    return str;
  });

  const condPart = condStrings.length > 0 ? `, ${condStrings.join(", ")}` : "";
  const actPart = actStrings.length > 0 ? actStrings.join(", ") : "NOP";

  return `${trigger}${condPart} -> ${actPart}`;
}

function updateBuilderPreview() {
  const code = generateRuleCode();
  const out = document.getElementById("builder-code-output");
  if (out) out.innerText = code;
}

async function saveBuilderRule() {
  const secName = document.getElementById("builder-section-name").value.trim() || "Geral";
  const rawCode = generateRuleCode();

  // Find or create section
  let targetSec = state.moveuse.sections.find(s => s.name.toLowerCase() === secName.toLowerCase());
  if (!targetSec) {
    targetSec = { name: secName, count: 0, rules: [] };
    state.moveuse.sections.push(targetSec);
  }

  // Extract item IDs from line for preview
  const foundIds = (rawCode.match(/\b\d{3,5}\b/g) || []).map(Number);
  const uniqueIds = [...new Set(foundIds)];

  const ruleObj = {
    id: Date.now(),
    section: targetSec.name,
    trigger: state.builder.eventType,
    conditions: "",
    actions: "",
    raw: rawCode,
    item_ids: uniqueIds
  };

  if (state.builder.editingRuleIndex !== null && state.builder.editingSection === targetSec.name) {
    targetSec.rules[state.builder.editingRuleIndex] = ruleObj;
  } else {
    targetSec.rules.unshift(ruleObj);
  }

  targetSec.count = targetSec.rules.length;

  document.getElementById("rule-builder-modal").classList.remove("active");
  renderMoveUseSections();
  await saveMoveUse();
  showToast(t("toast_moveuse_saved"), "success");
}

// =============================================================================
// TAB 6: CIPSOFT FUNCTION DICTIONARY (DOCUMENTATION)
// =============================================================================
function setupDocsTab() {
  const filterBtns = document.querySelectorAll("[data-doc-filter]");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.docs.filter = btn.getAttribute("data-doc-filter");
      renderDocsGrid();
    });
  });

  const searchInp = document.getElementById("docs-search-input");
  searchInp.addEventListener("input", (e) => {
    state.docs.search = e.target.value.trim().toLowerCase();
    renderDocsGrid();
  });
}

async function loadDocs() {
  try {
    const lang = "en";
    const res = await fetch(`/api/moveuse/docs?lang=en`);
    const data = await res.json();
    state.docs.catalog = data;

    // Popula os selects do Builder
    const condSelect = document.getElementById("select-add-condition");
    if (condSelect) {
      condSelect.innerHTML = `<option value="">${t("add_condition_opt")}</option>` +
        (data.conditions || []).map(c => `<option value="${c.id}">${c.name}</option>`).join("");
    }

    const actSelect = document.getElementById("select-add-action");
    if (actSelect) {
      actSelect.innerHTML = `<option value="">${t("add_action_opt")}</option>` +
        (data.actions || []).map(a => `<option value="${a.id}">${a.name}</option>`).join("");
    }

    renderDocsGrid();
  } catch (err) {
    console.error("Error loading function dictionary:", err);
  }
}

function renderDocsGrid() {
  const container = document.getElementById("docs-grid-container");
  if (!container) return;

  const { catalog, filter, search } = state.docs;
  let items = [];

  if (filter === "all" || filter === "events") {
    items.push(...(catalog.events || []).map(e => ({ ...e, kind: "event", kindLabel: t("badge_event_label") })));
  }
  if (filter === "all" || filter === "conditions") {
    items.push(...(catalog.conditions || []).map(c => ({ ...c, kind: "condition", kindLabel: t("badge_condition_label") })));
  }
  if (filter === "all" || filter === "actions") {
    items.push(...(catalog.actions || []).map(a => ({ ...a, kind: "action", kindLabel: t("badge_action_label") })));
  }

  if (search) {
    items = items.filter(it =>
      it.name.toLowerCase().includes(search) ||
      (it.id && it.id.toLowerCase().includes(search)) ||
      (it.desc && it.desc.toLowerCase().includes(search)) ||
      (it.example && it.example.toLowerCase().includes(search))
    );
  }

  container.innerHTML = items.map(it => {
    const paramsListHtml = (it.params || []).map(p => `
      <dt>${p.name} <span style="font-weight:normal;color:var(--text-muted);">(${p.type})</span></dt>
      <dd>${p.desc}</dd>
    `).join("");

    return `
      <div class="doc-card">
        <div class="doc-card-header">
          <span class="doc-card-title">${it.name}</span>
          <span class="doc-category-badge ${it.kind}">${it.kindLabel} • ${it.category}</span>
        </div>
        <p class="doc-desc">${it.desc}</p>
        ${it.params && it.params.length > 0 ? `
          <div class="doc-params-list">
            <div style="font-weight:700;color:var(--text-accent);margin-bottom:4px;">${t("lbl_parameters")}</div>
            <dl>${paramsListHtml}</dl>
          </div>
        ` : ''}
        ${it.example ? `
          <div class="doc-example-box">
            <strong>${t("lbl_example")}</strong> <code>${it.example}</code>
          </div>
        ` : ''}
      </div>
    `;
  }).join("");
}

// =============================================================================
// TAB 5: SPRITES BROWSER (PAGINATED 250 PER PAGE)
// =============================================================================
function setupSpritesTab() {
  document.querySelectorAll(".btn-zoom").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".btn-zoom").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.sprites.currentZoom = parseInt(btn.getAttribute("data-zoom")) || 1;
      renderSpritesGrid();
    });
  });

  document.getElementById("btn-go-sprite").addEventListener("click", () => {
    const searchId = parseInt(document.getElementById("sprite-id-search").value);
    if (!isNaN(searchId) && searchId > 0 && searchId <= state.sprites.total) {
      state.sprites.page = Math.ceil(searchId / state.sprites.limit) || 1;
      renderSpritesGrid();
      setTimeout(() => {
        const el = document.getElementById(`sprite-card-${searchId}`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          el.classList.add("sprite-highlight");
          setTimeout(() => el.classList.remove("sprite-highlight"), 2500);
        }
      }, 100);
    } else {
      showToast(t("toast_invalid_sprite_id"), "error");
    }
  });

  // Pagination Buttons
  document.getElementById("btn-sprites-first").addEventListener("click", () => {
    if (state.sprites.page > 1) {
      state.sprites.page = 1;
      renderSpritesGrid();
    }
  });

  document.getElementById("btn-sprites-prev").addEventListener("click", () => {
    if (state.sprites.page > 1) {
      state.sprites.page--;
      renderSpritesGrid();
    }
  });

  document.getElementById("btn-sprites-next").addEventListener("click", () => {
    const totalPages = Math.ceil(state.sprites.total / state.sprites.limit) || 1;
    if (state.sprites.page < totalPages) {
      state.sprites.page++;
      renderSpritesGrid();
    }
  });

  document.getElementById("btn-sprites-last").addEventListener("click", () => {
    const totalPages = Math.ceil(state.sprites.total / state.sprites.limit) || 1;
    if (state.sprites.page < totalPages) {
      state.sprites.page = totalPages;
      renderSpritesGrid();
    }
  });

  document.getElementById("btn-sprites-jump").addEventListener("click", () => {
    const p = parseInt(document.getElementById("sprites-page-input").value);
    const totalPages = Math.ceil(state.sprites.total / state.sprites.limit) || 1;
    if (!isNaN(p) && p >= 1 && p <= totalPages) {
      state.sprites.page = p;
      renderSpritesGrid();
    }
  });

  document.getElementById("sprites-page-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      document.getElementById("btn-sprites-jump").click();
    }
  });
}

function renderSpritesGrid() {
  const container = document.getElementById("sprites-browser-grid");
  const total = state.sprites.total || 10962;
  const limit = state.sprites.limit || 250;
  const totalPages = Math.ceil(total / limit) || 1;
  const page = Math.max(1, Math.min(state.sprites.page || 1, totalPages));
  state.sprites.page = page;

  const startId = (page - 1) * limit + 1;
  const endId = Math.min(total, startId + limit - 1);

  // Atualiza controles da barra
  document.getElementById("sprites-page-input").value = page;
  document.getElementById("sprites-page-total").innerText = `${t("lbl_of")} ${totalPages}`;
  document.getElementById("sprites-range-info").innerText = `${t("lbl_showing_sprites")} ${startId} - ${endId} ${t("lbl_of")} ${total.toLocaleString()}`;

  document.getElementById("btn-sprites-first").disabled = (page === 1);
  document.getElementById("btn-sprites-prev").disabled = (page === 1);
  document.getElementById("btn-sprites-next").disabled = (page === totalPages);
  document.getElementById("btn-sprites-last").disabled = (page === totalPages);

  const zoom = state.sprites.currentZoom || 1;
  const cellSizes = { 1: 88, 2: 112, 4: 168 };
  container.style.setProperty("--sprite-cell", `${cellSizes[zoom] || 88}px`);
  const cards = [];

  for (let id = startId; id <= endId; id++) {
    cards.push(`
      <div class="sprite-grid-item" id="sprite-card-${id}" onclick="copySpriteId(${id})" title="Sprite #${id}">
        <div class="sprite-thumb">
          <img src="/api/sprite/${id}?zoom=${zoom}" alt="#${id}" loading="lazy">
        </div>
        <span class="sprite-id-tag">#${id}</span>
      </div>
    `);
  }

  container.innerHTML = cards.join("");
  container.scrollTop = 0;
}

window.copySpriteId = function(id) {
  navigator.clipboard.writeText(String(id));
  showToast(`${t("toast_sprite_copied")}: #${id}`, "info");
};

// =============================================================================
// TAB 7: SETTINGS
// =============================================================================
async function saveConfig() {
  const dataPath = document.getElementById("cfg-data-path").value.trim();
  const clientPath = document.getElementById("cfg-client-path").value.trim();

  try {
    const res = await fetch("/api/config/load", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data_path: dataPath, client_path: clientPath })
    });
    const data = await res.json();
    showToast(t("toast_config_saved"), "success");
    setDirty(false);
    await loadInitialConfig();
    await loadObjects();
    await loadMonsters();
    await loadNpcs();
    await loadMoveUse();
    await loadEffects();
    return true;
  } catch (err) {
    showToast(t("toast_error_load_config"), "error");
    return false;
  }
}

function setupSettingsTab() {
  document.getElementById("btn-save-config").addEventListener("click", saveConfig);
}

// =============================================================================
// MODALS: ITEM PICKER AND EFFECT PICKER
// =============================================================================
let activePickerCallback = null;
let activeEffectCallback = null;
let cachedEffectsList = [];

function setupModals() {
  // Modal de Itens
  const itemModal = document.getElementById("item-picker-modal");
  document.getElementById("btn-close-picker").addEventListener("click", () => {
    itemModal.classList.remove("active");
  });

  const searchItemInput = document.getElementById("modal-item-search");
  searchItemInput.addEventListener("input", (e) => {
    loadModalItems(e.target.value.trim());
  });

  // Magic Effects Modal
  const effectModal = document.getElementById("effect-picker-modal");
  document.getElementById("btn-close-effect-picker").addEventListener("click", () => {
    effectModal.classList.remove("active");
  });

  const searchEffectInput = document.getElementById("modal-effect-search");
  searchEffectInput.addEventListener("input", (e) => {
    renderEffectsPickerGrid(e.target.value.trim());
  });
}

// ---- Seletor de Itens ----
let activePickerFlags = "";

function openItemPickerModal(title, callback, flags) {
  activePickerCallback = callback;
  activePickerFlags = flags || "";
  document.getElementById("modal-picker-title").innerText = title;
  document.getElementById("item-picker-modal").classList.add("active");
  document.getElementById("modal-item-search").value = "";
  loadModalItems("");
}

async function loadModalItems(query) {
  try {
    const res = await fetch(`/api/objects?limit=1000&q=${encodeURIComponent(query)}&flag=${encodeURIComponent(activePickerFlags)}`);
    const data = await res.json();
    const container = document.getElementById("modal-items-container");
    const countBadge = document.getElementById("modal-picker-count");

    const totalCount = data.total || (data.items ? data.items.length : 0);
    if (countBadge) {
      countBadge.textContent = `${totalCount} itens encontrados`;
    }

    if (!data.items || data.items.length === 0) {
      container.innerHTML = `<div style="grid-column: 1 / -1; padding: 2rem; text-align: center; color: var(--text-muted);">Nenhum item encontrado.</div>`;
      return;
    }

    container.innerHTML = data.items.map(item => `
      <button class="modal-item-btn" onclick="selectModalItem(${item.type_id}, '${(item.name || '').replace(/'/g, "\\'")}')" title="${item.name || ''} (#${item.type_id})">
        <img src="/api/item_sprite/${item.type_id}?zoom=1" style="width:36px;height:36px;image-rendering:pixelated;" loading="lazy">
        <div>
          <div style="font-weight:600;font-size:0.8rem;">${item.name || t("obj_unnamed")}</div>
          <div style="font-size:0.7rem;color:var(--text-muted);">#${item.type_id}</div>
        </div>
      </button>
    `).join("");
  } catch (err) {
    console.error("Error loading items in modal:", err);
  }
}

window.selectModalItem = function(typeId, name) {
  if (activePickerCallback) {
    activePickerCallback({ type_id: typeId, name: name });
  }
  document.getElementById("item-picker-modal").classList.remove("active");
};

// ---- Magic Effects Selector ----
async function loadEffects() {
  try {
    const res = await fetch("/api/effects");
    const data = await res.json();
    cachedEffectsList = data.effects || [];
  } catch (err) {
    console.error("Error loading magic effects:", err);
  }
}

function openEffectPickerModal(callback) {
  activeEffectCallback = callback;
  document.getElementById("modal-effect-picker-title").innerText = t("modal_effect_picker_title");
  document.getElementById("effect-picker-modal").classList.add("active");
  document.getElementById("modal-effect-search").value = "";
  renderEffectsPickerGrid("");
}

function renderEffectsPickerGrid(query) {
  const container = document.getElementById("modal-effects-container");
  const q = (query || "").toLowerCase().trim();

  const filtered = cachedEffectsList.filter(eff => {
    if (!q) return true;
    return String(eff.id).includes(q) || eff.name.toLowerCase().includes(q) || eff.desc.toLowerCase().includes(q);
  });

  container.innerHTML = filtered.map(eff => `
    <div class="effect-select-card" onclick="selectModalEffect(${eff.id}, '${eff.name.replace(/'/g, "\\'")}')">
      <div class="effect-thumb-box">
        <img src="/api/effect_sprite/${eff.id}?zoom=1" alt="${eff.name}">
      </div>
      <div class="effect-meta">
        <span class="effect-name">${eff.name}</span>
        <span class="effect-id-badge">EffectID: ${eff.id}</span>
      </div>
    </div>
  `).join("");
}

window.selectModalEffect = function(effectId, name) {
  if (activeEffectCallback) {
    activeEffectCallback({ id: effectId, name: name });
  }
  document.getElementById("effect-picker-modal").classList.remove("active");
};

// =============================================================================
// TOAST NOTIFICATIONS
// =============================================================================
function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerText = message;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 200);
  }, 3000);
}

// =============================================================================
// RECURSOS INOVADORES
// =============================================================================

// ---- 1. 360° Rotation and Step Cycle (Walk Animation) ----
function setupOutfitControls() {
  document.querySelectorAll(".btn-dir-ctrl").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-target"); // "mon" | "npc"
      const dir = parseInt(btn.getAttribute("data-dir"));
      if (!target || isNaN(dir) || !state.outfits[target]) return;

      state.outfits[target].dir = dir;
      const toolbar = btn.closest(".outfit-dir-toolbar");
      if (toolbar) {
        toolbar.querySelectorAll(".btn-dir-ctrl").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
      }
      if (target === "mon") {
        if (typeof window.updateMonsterPreview === "function") window.updateMonsterPreview();
      } else {
        updateNpcSpritePreview();
      }
    });
  });

  const setupAnimBtn = (btnId, target) => {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    btn.addEventListener("click", () => {
      const cfg = state.outfits[target];
      if (!cfg) return;
      if (cfg.timer) {
        clearInterval(cfg.timer);
        cfg.timer = null;
        cfg.anim = 0;
        btn.classList.remove("playing");
      } else {
        btn.classList.add("playing");
        cfg.timer = setInterval(() => {
          cfg.anim = (cfg.anim + 1) % 3;
          if (target === "mon") {
            if (typeof window.updateMonsterPreview === "function") window.updateMonsterPreview();
          } else {
            updateNpcSpritePreview();
          }
        }, 220);
      }
      if (target === "mon") {
        if (typeof window.updateMonsterPreview === "function") window.updateMonsterPreview();
      } else {
        updateNpcSpritePreview();
      }
    });
  };

  setupAnimBtn("btn-mon-anim", "mon");
  setupAnimBtn("btn-npc-anim", "npc");
}

// ---- 2. Interactive NPC Dialogue Simulator ----
function setupNpcChatSimulator() {
  const form = document.getElementById("chat-sim-form");
  const input = document.getElementById("chat-sim-input");
  const messagesContainer = document.getElementById("chat-sim-messages");
  const topicBadge = document.getElementById("chat-sim-topic-badge");
  const moneyInput = document.getElementById("chat-sim-player-money");
  const playerInput = document.getElementById("chat-sim-player-name");
  const btnReset = document.getElementById("btn-chat-sim-reset");

  const appendMsg = (sender, text, isAction = false) => {
    const msgDiv = document.createElement("div");
    msgDiv.className = `chat-msg ${sender}`;
    if (isAction) msgDiv.style.fontStyle = "italic";
    msgDiv.innerText = text;
    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  };

  const resetChat = () => {
    state.npcChat.topic = 0;
    state.npcChat.lastPrice = 0;
    if (topicBadge) topicBadge.innerText = "Topic: 0";
    if (messagesContainer) {
      messagesContainer.innerHTML = `<div class="chat-msg system" id="chat-sim-welcome-msg">${t("chat_sim_welcome")}</div>`;
    }
  };

  if (btnReset) {
    btnReset.addEventListener("click", resetChat);
  }

  // Quick shortcut chips
  document.querySelectorAll(".chip-prompt").forEach(chip => {
    chip.addEventListener("click", () => {
      const msg = chip.getAttribute("data-msg");
      if (msg && input && form) {
        input.value = msg;
        form.dispatchEvent(new Event("submit"));
      }
    });
  });

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;
      input.value = "";

      const playerName = playerInput ? playerInput.value.trim() || "Player" : "Player";
      const money = moneyInput ? parseInt(moneyInput.value) || 1000 : 1000;
      appendMsg("player", `${playerName}: ${text}`);

      try {
        const payload = {
          filename: state.npcs.selectedFilename || "",
          message: text,
          player_name: playerName,
          topic: state.npcChat.topic,
          player_money: money,
          last_price: state.npcChat.lastPrice
        };

        const res = await fetch("/api/npcs/simulate_chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        const data = await res.json();

        if (data.success) {
          state.npcChat.topic = data.new_topic;
          state.npcChat.lastPrice = data.item_price || state.npcChat.lastPrice;
          if (topicBadge) topicBadge.innerText = `Topic: ${data.new_topic}`;
          if (moneyInput && data.new_money !== undefined) {
            moneyInput.value = data.new_money;
          }

          appendMsg("npc", `${data.npc_name}: ${data.message}`);

          if (data.item_created) {
            appendMsg("system", `🎁 [Item received: #${data.item_created} x${data.item_amount}]`, true);
          }
        } else {
          appendMsg("system", `Error: ${data.error || "NPC did not respond."}`);
        }
      } catch (err) {
        appendMsg("system", `Communication error with simulator.`);
      }
    });
  }
}

// ---- 3. Simulador Monte Carlo de Drops de Monster Loot ----
function setupLootSimulator() {
  const modal = document.getElementById("loot-sim-modal");
  const btnOpen = document.getElementById("btn-open-loot-sim");
  const btnClose = document.getElementById("btn-close-loot-sim");
  const btnCloseFooter = document.getElementById("btn-close-loot-sim-footer");
  const btnRun = document.getElementById("btn-run-loot-sim");
  const killBtns = document.querySelectorAll(".loot-kills-btn");

  if (btnOpen) {
    btnOpen.addEventListener("click", () => {
      const monName = document.getElementById("mon-name")?.value || "Monstro";
      const title = document.getElementById("loot-sim-title");
      if (title) title.innerText = `🎲 ${t("loot_sim_title")} - ${monName}`;
      modal.style.display = "flex";
      modal.classList.add("active");
    });
  }

  const closeModal = () => {
    if (modal) {
      modal.style.display = "none";
      modal.classList.remove("active");
    }
  };

  if (btnClose) btnClose.addEventListener("click", closeModal);
  if (btnCloseFooter) btnCloseFooter.addEventListener("click", closeModal);

  killBtns.forEach(b => {
    b.addEventListener("click", () => {
      killBtns.forEach(btn => btn.classList.remove("active"));
      b.classList.add("active");
      state.lootSim.kills = parseInt(b.getAttribute("data-kills")) || 100;
    });
  });

  if (btnRun) {
    btnRun.addEventListener("click", async () => {
      btnRun.disabled = true;
      btnRun.innerText = "⏳ Simulando...";

      try {
        const payload = {
          filename: state.monsters.selectedFilename || "",
          kills: state.lootSim.kills
        };

        const res = await fetch("/api/monsters/simulate_loot", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        const data = await res.json();

        if (data.success) {
          document.getElementById("loot-sim-summary").style.display = "grid";
          document.getElementById("loot-sim-results").style.display = "block";

          document.getElementById("sim-stat-total-drops").innerText = data.total_items_dropped.toLocaleString();
          document.getElementById("sim-stat-total-gold").innerText = `${data.total_gold_value.toLocaleString()} gp`;
          const avgGold = (data.total_gold_value / (data.kills || 1)).toFixed(1);
          document.getElementById("sim-stat-avg-gold").innerText = `${avgGold} gp`;

          const tbody = document.getElementById("loot-sim-tbody");
          const rarityLabels = {
            common: t("rarity_common"),
            uncommon: t("rarity_uncommon"),
            rare: t("rarity_rare"),
            very_rare: t("rarity_very_rare")
          };

          tbody.innerHTML = data.items.map(item => `
            <tr>
              <td>
                <img src="/api/item_sprite/${item.type_id}?zoom=1" style="width:28px;height:28px;image-rendering:pixelated;" alt="${item.name}">
              </td>
              <td>
                <strong>${item.name}</strong> <span style="font-size:0.75rem;color:var(--text-muted);">(#${item.type_id})</span>
                <div><span class="badge-rarity ${item.rarity}">${rarityLabels[item.rarity] || item.rarity}</span></div>
              </td>
              <td style="text-align:right;">${item.theory_chance_pct}%</td>
              <td style="text-align:right;font-weight:700;color:var(--accent-color);">${item.actual_chance_pct}%</td>
              <td style="text-align:right;"><strong>${item.total_dropped.toLocaleString()}x</strong> <span style="font-size:0.75rem;color:var(--text-muted);">(${item.times_dropped} kills)</span></td>
              <td style="text-align:right;font-weight:600;color:#fbbf24;">${item.estimated_gold_value.toLocaleString()} gp</td>
            </tr>
          `).join("");
        } else {
          showToast(data.error || "Error in loot simulation", "error");
        }
      } catch (err) {
        showToast("Network error during loot simulation", "error");
      } finally {
        btnRun.disabled = false;
        btnRun.innerText = `⚡ ${t("btn_run_loot_sim")}`;
      }
    });
  }
}

// ---- 4. Automated Backup History & Management ----
async function loadBackupsList() {
  const tbody = document.getElementById("backups-list-tbody");
  if (!tbody) return;

  try {
    const res = await fetch("/api/backups");
    const data = await res.json();
    const backups = data.backups || [];

    if (backups.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;color:var(--text-muted);padding:1.5rem;">${t("no_backups_found")}</td></tr>`;
      return;
    }

    const catBadges = {
      objects: '<span class="badge" style="background:rgba(59,130,246,0.15);color:#60a5fa;">objects.srv</span>',
      monsters: '<span class="badge" style="background:rgba(239,68,68,0.15);color:#f87171;">Monster .mon</span>',
      npcs: '<span class="badge" style="background:rgba(34,197,94,0.15);color:#4ade80;">NPC .npc</span>',
      moveuse: '<span class="badge" style="background:rgba(245,158,11,0.15);color:#fbbf24;">moveuse.dat</span>',
      data: '<span class="badge" style="background:rgba(168,85,247,0.15);color:#c084fc;">Config</span>'
    };

    tbody.innerHTML = backups.map(b => `
      <tr>
        <td style="font-size:0.85rem;font-weight:500;">${b.iso_time || b.timestamp}</td>
        <td><code>${b.original_name}</code></td>
        <td>${catBadges[b.category] || b.category}</td>
        <td style="font-size:0.85rem;color:var(--text-muted);">${b.size_formatted}</td>
        <td style="text-align:center;">
          <button type="button" class="btn btn-xs btn-outline" onclick="restoreBackupFile('${b.full_path.replace(/\\/g, '\\\\')}')">↺ ${t("btn_restore")}</button>
        </td>
      </tr>
    `).join("");
  } catch (err) {
    console.error("Error loading backup history:", err);
  }
}

window.restoreBackupFile = async function(backupPath) {
  if (!confirm(t("confirm_restore_backup"))) return;

  try {
    const res = await fetch("/api/backups/restore", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ backup_path: backupPath })
    });
    const data = await res.json();
    if (data.success) {
      showToast(t("toast_backup_restored"), "success");
      await loadInitialConfig();
      await loadObjects();
      await loadMonsters();
      await loadNpcs();
      await loadMoveUse();
      await loadBackupsList();
    } else {
      showToast(data.error || t("toast_backup_restore_error"), "error");
    }
  } catch (err) {
    showToast(t("toast_backup_restore_error"), "error");
  }
};

function setupBackupManager() {
  const btnRefresh = document.getElementById("btn-refresh-backups");
  if (btnRefresh) {
    btnRefresh.addEventListener("click", () => {
      loadBackupsList();
      showToast("Backups list refreshed", "info");
    });
  }
}

// ---- 5. Menu Responsivo Mobile ----
function setupMobileMenu() {
  const btnMobile = document.getElementById("btn-mobile-menu");
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector(".sidebar-overlay");

  if (btnMobile && sidebar && overlay) {
    btnMobile.addEventListener("click", () => {
      sidebar.classList.toggle("open");
      overlay.classList.toggle("active");
    });

    overlay.addEventListener("click", () => {
      sidebar.classList.remove("open");
      overlay.classList.remove("active");
    });

    document.querySelectorAll(".nav-item").forEach(item => {
      item.addEventListener("click", () => {
        sidebar.classList.remove("open");
        overlay.classList.remove("active");
      });
    });
  }
}

// =============================================================================
// RECURSO 1: MINIMAPA & VISUALIZADOR DE SPAWNS (HTML5 CANVAS)
// =============================================================================
let mapCanvasInitialized = false;
let mapLastLoadedCenterX = 0;
let mapLastLoadedCenterY = 0;
let mapLastLoadedZ = 7;
let mapDragActive = false;
let mapDragMouseX = 0;
let mapDragMouseY = 0;
let mapDragOrigCenterX = 0;
let mapDragOrigCenterY = 0;

function setupMapTab() {
  const btnGo = document.getElementById("btn-map-go-coord");
  const inputX = document.getElementById("map-input-x");
  const inputY = document.getElementById("map-input-y");
  const selectZ = document.getElementById("map-input-z");

  if (btnGo) {
    btnGo.addEventListener("click", () => {
      const x = parseInt(inputX.value) || 32360;
      const y = parseInt(inputY.value) || 32199;
      const z = parseInt(selectZ.value) || 7;
      setMapPosition(x, y, z);
    });
  }

  if (selectZ) {
    selectZ.addEventListener("change", (e) => {
      const z = parseInt(e.target.value) || 7;
      state.map.z = z;
      state.map.tiles = {};
      loadMapEntities(z);
      loadMapChunk(state.map.centerX, state.map.centerY, z);
    });
  }

  const btnFloorUp = document.getElementById("btn-map-floor-up");
  const btnFloorDown = document.getElementById("btn-map-floor-down");
  if (btnFloorUp) {
    btnFloorUp.addEventListener("click", () => {
      if (state.map.z > 0) {
        setMapPosition(state.map.centerX, state.map.centerY, state.map.z - 1);
      }
    });
  }
  if (btnFloorDown) {
    btnFloorDown.addEventListener("click", () => {
      if (state.map.z < 15) {
        setMapPosition(state.map.centerX, state.map.centerY, state.map.z + 1);
      }
    });
  }

  // Layer toggles
  const chkMonsters = document.getElementById("chk-layer-monsters");
  const chkNpcs = document.getElementById("chk-layer-npcs");
  const chkOutfits = document.getElementById("chk-layer-outfits");
  const chkSigns = document.getElementById("chk-layer-signs");
  const chkHouses = document.getElementById("chk-layer-houses");
  const chkLowerFloors = document.getElementById("chk-layer-lower-floors");

  setupSignModal();
  const chkGrid = document.getElementById("chk-layer-grid");

  if (chkMonsters) chkMonsters.addEventListener("change", (e) => { state.map.layers.monsters = e.target.checked; renderMapCanvas(); });
  if (chkNpcs) chkNpcs.addEventListener("change", (e) => { state.map.layers.npcs = e.target.checked; renderMapCanvas(); });
  if (chkOutfits) chkOutfits.addEventListener("change", (e) => { state.map.layers.outfits = e.target.checked; renderMapCanvas(); });
  if (chkSigns) chkSigns.addEventListener("change", (e) => { state.map.layers.signs = e.target.checked; renderMapCanvas(); });
  if (chkHouses) chkHouses.addEventListener("change", (e) => { state.map.layers.houses = e.target.checked; renderMapCanvas(); });
  if (chkLowerFloors) chkLowerFloors.addEventListener("change", (e) => { state.map.layers.lowerFloors = e.target.checked; renderMapCanvas(); });
  if (chkGrid) chkGrid.addEventListener("change", (e) => { state.map.layers.grid = e.target.checked; renderMapCanvas(); });

  // Subtabs de entidades (Monstros, NPCs, Placas, Casas)
  const subtabs = [
    { btn: "btn-subtab-spawns", pane: "map-pane-spawns", type: "spawns" },
    { btn: "btn-subtab-npcs", pane: "map-pane-npcs", type: "npcs" },
    { btn: "btn-subtab-signs", pane: "map-pane-signs", type: "signs" },
    { btn: "btn-subtab-houses", pane: "map-pane-houses", type: "houses" }
  ];

  subtabs.forEach(tab => {
    const elBtn = document.getElementById(tab.btn);
    if (elBtn) {
      elBtn.addEventListener("click", () => {
        subtabs.forEach(t => {
          document.getElementById(t.btn)?.classList.remove("active");
          const p = document.getElementById(t.pane);
          if (p) p.style.display = "none";
        });
        elBtn.classList.add("active");
        const activePane = document.getElementById(tab.pane);
        if (activePane) activePane.style.display = "block";
        state.map.activeSubtab = tab.type;
        renderMapEntitiesList();
      });
    }
  });

  // Campo de filtro de entidades
  const searchInput = document.getElementById("map-entities-search");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.map.searchQuery = e.target.value.toLowerCase().trim();
      renderMapEntitiesList();
    });
  }

  // Floating zoom buttons
  document.getElementById("btn-map-zoom-in")?.addEventListener("click", () => changeMapZoom(0.25));
  document.getElementById("btn-map-zoom-out")?.addEventListener("click", () => changeMapZoom(-0.25));
  document.getElementById("btn-map-zoom-reset")?.addEventListener("click", () => {
    state.map.zoom = 1.0;
    updateMapZoomIndicator();
    renderMapCanvas();
  });

  document.getElementById("btn-map-fullscreen")?.addEventListener("click", () => {
    const vp = document.getElementById("map-viewport");
    if (!document.fullscreenElement) {
      vp?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  });

  // Canvas event setup
  setupCanvasEvents();
}

function initMapModule() {
  const canvas = document.getElementById("map-canvas");
  const viewport = document.getElementById("map-viewport");
  if (!canvas || !viewport) return;

  // Adjust canvas resolution
  canvas.width = viewport.clientWidth || 800;
  canvas.height = viewport.clientHeight || 600;

  if (!mapCanvasInitialized) {
    mapCanvasInitialized = true;
    loadMapOverview();
    loadMapEntities(state.map.z);
    loadMapChunk(state.map.centerX, state.map.centerY, state.map.z);
  } else {
    renderMapCanvas();
  }
}

async function loadMapOverview() {
  try {
    const res = await fetch("/api/map/overview");
    const data = await res.json();

    const badge = document.getElementById("map-total-sectors-badge");
    if (badge) {
      badge.textContent = `${data.total_sectors || 0} Setores (${data.total_spawns || 0} Spawns)`;
    }

    // Renderizar chips das cidades
    const citiesContainer = document.getElementById("map-cities-container");
    if (citiesContainer && data.cities) {
      citiesContainer.innerHTML = data.cities.map(c => `
        <button type="button" class="chip-city" data-x="${c.x}" data-y="${c.y}" data-z="${c.z}" title="${c.desc || ''}">
          🏛️ ${c.name}
        </button>
      `).join("");

      citiesContainer.querySelectorAll(".chip-city").forEach(btn => {
        btn.addEventListener("click", () => {
          const x = parseInt(btn.getAttribute("data-x"));
          const y = parseInt(btn.getAttribute("data-y"));
          const z = parseInt(btn.getAttribute("data-z"));
          setMapPosition(x, y, z);
        });
      });
    }
  } catch (err) {
    console.warn("Error loading map overview:", err);
  }
}

async function loadMapEntities(z) {
  try {
    const [spawnsRes, npcsRes, signsRes, housesRes] = await Promise.all([
      fetch(`/api/map/spawns?z=${z}`).then(r => r.json()),
      fetch(`/api/map/npcs?z=${z}`).then(r => r.json()),
      fetch(`/api/map/signs?z=${z}`).then(r => r.json()),
      fetch(`/api/map/houses?z=${z}`).then(r => r.json())
    ]);

    state.map.spawns = spawnsRes.spawns || [];
    state.map.npcs = npcsRes.npcs || [];
    state.map.signs = signsRes.signs || [];
    state.map.houses = housesRes.houses || [];

    // Atualiza contadores
    const countSpawns = document.getElementById("count-map-spawns");
    const countNpcs = document.getElementById("count-map-npcs");
    const countSigns = document.getElementById("count-map-signs");
    const countHouses = document.getElementById("count-map-houses");

    if (countSpawns) countSpawns.textContent = state.map.spawns.length;
    if (countNpcs) countNpcs.textContent = state.map.npcs.length;
    if (countSigns) countSigns.textContent = state.map.signs.length;
    if (countHouses) countHouses.textContent = state.map.houses.length;

    renderMapEntitiesList();
    renderMapCanvas();
  } catch (err) {
    console.warn("Error loading map entities:", err);
  }
}

function renderMapEntitiesList() {
  const q = state.map.searchQuery;
  const listSpawns = document.getElementById("map-list-spawns");
  const listNpcs = document.getElementById("map-list-npcs");
  const listSigns = document.getElementById("map-list-signs");
  const listHouses = document.getElementById("map-list-houses");

  if (state.map.activeSubtab === "spawns" && listSpawns) {
    const filtered = state.map.spawns.filter(s => !q || s.name.toLowerCase().includes(q) || String(s.race).includes(q));
    if (filtered.length === 0) {
      listSpawns.innerHTML = `<div class="empty-state" style="padding:1rem;">No monsters on this floor/filter.</div>`;
    } else {
      listSpawns.innerHTML = filtered.slice(0, 100).map(s => `
        <div class="map-entity-item" data-x="${s.x}" data-y="${s.y}" data-z="${s.z}">
          <div class="entity-item-header">
            <strong>🦁 ${escapeHtmlText(s.name)}</strong>
            <span class="badge">x${s.amount}</span>
          </div>
          <div class="entity-item-coords">
            Coords: [${s.x}, ${s.y}, ${s.z}] • Radius: ${s.radius} • Regen: ${s.regen}s
          </div>
        </div>
      `).join("");
    }
  }

  if (state.map.activeSubtab === "npcs" && listNpcs) {
    const filtered = state.map.npcs.filter(n => !q || n.name.toLowerCase().includes(q) || n.filename.toLowerCase().includes(q));
    if (filtered.length === 0) {
      listNpcs.innerHTML = `<div class="empty-state" style="padding:1rem;">No NPCs on this floor/filter.</div>`;
    } else {
      listNpcs.innerHTML = filtered.map(n => `
        <div class="map-entity-item" data-x="${n.x}" data-y="${n.y}" data-z="${n.z}">
          <div class="entity-item-header">
            <strong>🧙 ${escapeHtmlText(n.name)}</strong>
            <span class="badge">${escapeHtmlText(n.filename)}</span>
          </div>
          <div class="entity-item-coords">
            Coords: [${n.x}, ${n.y}, ${n.z}] • Radius: ${n.radius}
          </div>
        </div>
      `).join("");
    }
  }

  if (state.map.activeSubtab === "signs" && listSigns) {
    const filtered = state.map.signs.filter(s => !q || s.text.toLowerCase().includes(q) || (s.editor && s.editor.toLowerCase().includes(q)));
    if (filtered.length === 0) {
      listSigns.innerHTML = `<div class="empty-state" style="padding:1rem;">No signs or plaques with text on this floor/filter.</div>`;
    } else {
      listSigns.innerHTML = filtered.map((s, idx) => {
        const firstLine = s.text.split("\n")[0].trim();
        return `
          <div class="map-entity-item map-sign-list-item" data-sign-idx="${idx}" data-x="${s.x}" data-y="${s.y}" data-z="${s.z}" style="cursor:pointer;">
            <div class="entity-item-header">
              <div style="display:flex;align-items:center;gap:6px;">
                <img src="/api/item_sprite/${s.item_id || 2012}?zoom=1" style="width:18px;height:18px;image-rendering:pixelated;" loading="lazy">
                <strong>📜 ${escapeHtmlText(firstLine.slice(0, 26))}${firstLine.length > 26 ? "..." : ""}</strong>
              </div>
              <div style="display:flex;align-items:center;gap:4px;">
                ${s.editor ? `<span class="badge" title="Editor">${escapeHtmlText(s.editor)}</span>` : ""}
                <button type="button" class="btn btn-xs btn-outline btn-open-sign-card" data-sign-idx="${idx}" data-x="${s.x}" data-y="${s.y}" data-z="${s.z}" title="Open full text modal" style="padding:1px 6px;font-size:0.72rem;">📖 Read</button>
              </div>
            </div>
            <div class="entity-item-coords">
              Coords: [${s.x}, ${s.y}, ${s.z}] • "${escapeHtmlText(s.text.replace(/\n/g, " ").slice(0, 48))}"
            </div>
          </div>
        `;
      }).join("");
    }
  }

  if (state.map.activeSubtab === "houses" && listHouses) {
    const filtered = state.map.houses.filter(h => !q || h.name.toLowerCase().includes(q) || String(h.id).includes(q));
    if (filtered.length === 0) {
      listHouses.innerHTML = `<div class="empty-state" style="padding:1rem;">No houses on this floor/filter.</div>`;
    } else {
      listHouses.innerHTML = filtered.map(h => `
        <div class="map-entity-item" data-x="${h.center[0]}" data-y="${h.center[1]}" data-z="${h.center[2]}">
          <div class="entity-item-header">
            <strong>🏰 ${escapeHtmlText(h.name)}</strong>
            <span class="badge">#${h.id}</span>
          </div>
          <div class="entity-item-coords">
            Center: [${h.center.join(", ")}] ${h.rent ? `• Rent: ${h.rent} gp` : ""}
          </div>
        </div>
      `).join("");
    }
  }

  // Clique em qualquer item de entidade centraliza no mapa e destaca!
  document.querySelectorAll(".map-entity-item").forEach(item => {
    item.addEventListener("click", (e) => {
      // Se clicou no botão "Ler", o botão já tratou o evento
      if (e.target.closest(".btn-open-sign-card")) return;

      document.querySelectorAll(".map-entity-item").forEach(el => el.classList.remove("active"));
      item.classList.add("active");
      const x = parseInt(item.getAttribute("data-x"));
      const y = parseInt(item.getAttribute("data-y"));
      const z = parseInt(item.getAttribute("data-z"));
      if (state.map.activeSubtab === "spawns") {
        state.map.selectedSpawn = { x, y, z };
        state.map.selectedNpc = null;
        state.map.selectedSign = null;
      } else if (state.map.activeSubtab === "npcs") {
        state.map.selectedNpc = { x, y, z };
        state.map.selectedSpawn = null;
        state.map.selectedSign = null;
      } else if (state.map.activeSubtab === "signs") {
        const foundSign = state.map.signs.find(s => s.x === x && s.y === y && s.z === z);
        state.map.selectedSign = foundSign || { x, y, z };
        state.map.selectedSpawn = null;
        state.map.selectedNpc = null;
        if (foundSign) {
          openSignModal(foundSign);
        }
      } else {
        state.map.selectedSpawn = null;
        state.map.selectedNpc = null;
        state.map.selectedSign = null;
      }
      setMapPosition(x, y, z);
    });

    item.querySelectorAll(".btn-open-sign-card").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        e.preventDefault();
        const bx = parseInt(btn.getAttribute("data-x") || item.getAttribute("data-x"));
        const by = parseInt(btn.getAttribute("data-y") || item.getAttribute("data-y"));
        const bz = parseInt(btn.getAttribute("data-z") || item.getAttribute("data-z"));
        const signIdx = parseInt(btn.getAttribute("data-sign-idx"));

        let foundSign = state.map.signs.find(s => s.x === bx && s.y === by && s.z === bz);
        if (!foundSign && !isNaN(signIdx)) {
          const filteredSigns = state.map.signs.filter(s => {
            if (!q) return true;
            return s.text.toLowerCase().includes(q) || (s.editor && s.editor.toLowerCase().includes(q));
          });
          foundSign = filteredSigns[signIdx] || state.map.signs[signIdx];
        }

        if (foundSign) {
          state.map.selectedSign = foundSign;
          state.map.selectedSpawn = null;
          state.map.selectedNpc = null;
          renderMapCanvas();
          openSignModal(foundSign);
        }
      });
    });
  });
}

async function loadMapChunk(cx, cy, cz, radius = 24) {
  try {
    mapLastLoadedCenterX = cx;
    mapLastLoadedCenterY = cy;
    mapLastLoadedZ = cz;

    const res = await fetch(`/api/map/chunk?x=${cx}&y=${cy}&z=${cz}&radius=${radius}`);
    const data = await res.json();

    if (data.tiles) {
      const tileList = Array.isArray(data.tiles) ? data.tiles : Object.values(data.tiles);
      tileList.forEach(t => {
        const key = `${t.x},${t.y}`;
        state.map.tiles[key] = t;
      });
    }

    renderMapCanvas();
  } catch (err) {
    console.warn("Error loading map chunk:", err);
  }
}

function setMapPosition(x, y, z) {
  state.map.centerX = x;
  state.map.centerY = y;
  const zChanged = (state.map.z !== z);
  state.map.z = z;

  // Atualiza inputs
  const inputX = document.getElementById("map-input-x");
  const inputY = document.getElementById("map-input-y");
  const selectZ = document.getElementById("map-input-z");
  if (inputX) inputX.value = x;
  if (inputY) inputY.value = y;
  if (selectZ) selectZ.value = z;

  if (zChanged) {
    state.map.tiles = {};
    loadMapEntities(z);
  }

  loadMapChunk(x, y, z);
  updateHUD(x, y, z);
}

function changeMapZoom(delta) {
  state.map.zoom = Math.min(3.0, Math.max(0.25, state.map.zoom + delta));
  updateMapZoomIndicator();
  renderMapCanvas();
}

function updateMapZoomIndicator() {
  const zoomText = document.getElementById("map-zoom-text");
  if (zoomText) {
    zoomText.textContent = `${Math.round(state.map.zoom * 100)}%`;
  }
}

function updateHUD(x, y, z, entityName = null) {
  const hudCoord = document.getElementById("hud-coord");
  const hudSector = document.getElementById("hud-sector");
  const hudHovered = document.getElementById("hud-hovered");

  if (hudCoord) hudCoord.textContent = `X: ${x}, Y: ${y}, Z: ${z}`;

  if (hudSector) {
    const secX = Math.floor(x / 32);
    const secY = Math.floor(y / 32);
    const secZ = String(z).padStart(2, '0');
    hudSector.textContent = `${secX}-${secY}-${secZ}.sec`;
  }

  if (hudHovered) {
    if (entityName) {
      hudHovered.textContent = entityName;
      hudHovered.style.color = "#38bdf8";
    } else {
      hudHovered.textContent = "None";
      hudHovered.style.color = "var(--text-muted)";
    }
  }
}

function setupCanvasEvents() {
  const canvas = document.getElementById("map-canvas");
  const viewport = document.getElementById("map-viewport");
  if (!canvas || !viewport) return;

  window.addEventListener("resize", () => {
    if (state.currentTab === "tab-map") {
      canvas.width = viewport.clientWidth || 800;
      canvas.height = viewport.clientHeight || 600;
      renderMapCanvas();
    }
  });

  let mapDragMoved = false;

  canvas.addEventListener("mousedown", (e) => {
    mapDragActive = true;
    mapDragMoved = false;
    mapDragMouseX = e.clientX;
    mapDragMouseY = e.clientY;
    mapDragOrigCenterX = state.map.centerX;
    mapDragOrigCenterY = state.map.centerY;
    canvas.style.cursor = "grabbing";
  });

  window.addEventListener("mouseup", () => {
    if (mapDragActive) {
      mapDragActive = false;
      canvas.style.cursor = "crosshair";

      // If moved > 8 tiles since last chunk load, reload new chunk
      const dist = Math.hypot(state.map.centerX - mapLastLoadedCenterX, state.map.centerY - mapLastLoadedCenterY);
      if (dist >= 8) {
        loadMapChunk(state.map.centerX, state.map.centerY, state.map.z);
      }
    }
  });

  canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const tileSize = 20 * state.map.zoom;
    const halfW = canvas.width / 2;
    const halfH = canvas.height / 2;

    if (mapDragActive) {
      const dxPx = e.clientX - mapDragMouseX;
      const dyPx = e.clientY - mapDragMouseY;
      if (Math.hypot(dxPx, dyPx) > 6) {
        mapDragMoved = true;
      }
      state.map.centerX = Math.round(mapDragOrigCenterX - (dxPx / tileSize));
      state.map.centerY = Math.round(mapDragOrigCenterY - (dyPx / tileSize));

      const inputX = document.getElementById("map-input-x");
      const inputY = document.getElementById("map-input-y");
      if (inputX) inputX.value = state.map.centerX;
      if (inputY) inputY.value = state.map.centerY;

      renderMapCanvas();
    }

    // Calcula coordenadas no mundo do Tibia
    const worldX = Math.floor(state.map.centerX + (mouseX - halfW) / tileSize);
    const worldY = Math.floor(state.map.centerY + (mouseY - halfH) / tileSize);
    state.map.hoveredCoord = { x: worldX, y: worldY, z: state.map.z };

    // Busca entidade sob o mouse
    let foundEntity = null;
    state.map.hoveredSpawn = null;
    let isHoveringSign = false;

    // 1. Check if mouse is directly over any tooltip or sign icon on screen
    if (state.map.layers.signs && state.map.visibleSignsOnScreen && state.map.visibleSignsOnScreen.length > 0) {
      const hitSign = state.map.visibleSignsOnScreen.find(s => {
        if (s.bubble && mouseX >= s.bubble.x && mouseX <= s.bubble.x + s.bubble.w &&
            mouseY >= s.bubble.y && mouseY <= s.bubble.y + s.bubble.h) {
          return true;
        }
        if (Math.hypot(mouseX - s.anchor.cx, mouseY - s.anchor.cy) <= s.anchor.r) {
          return true;
        }
        return false;
      });
      if (hitSign) {
        isHoveringSign = true;
        state.map.hoveredCoord = { x: hitSign.sign.x, y: hitSign.sign.y, z: hitSign.sign.z };
        const preview = hitSign.sign.text.replace(/\n/g, " ").slice(0, 45);
        foundEntity = `📜 Placa: "${preview}${hitSign.sign.text.length > 45 ? "..." : ""}" (Clique para ler)`;
      }
    }

    if (!isHoveringSign && state.map.layers.monsters) {
      const spawn = state.map.spawns.find(s => s.z === state.map.z && Math.hypot(s.x - worldX, s.y - worldY) <= Math.max(1.5, (s.radius || 1)));
      if (spawn) {
        foundEntity = `🦁 Monstro: ${spawn.name} (x${spawn.amount})`;
        state.map.hoveredSpawn = spawn;
      }
    }
    if (!isHoveringSign && !foundEntity && state.map.layers.npcs) {
      const npc = state.map.npcs.find(n => n.z === state.map.z && n.x === worldX && n.y === worldY);
      if (npc) foundEntity = `🧙 NPC: ${npc.name}`;
    }
    if (!isHoveringSign && !foundEntity && state.map.layers.signs) {
      const sign = state.map.signs.find(s => s.z === state.map.z && Math.hypot(s.x - worldX, s.y - worldY) <= 1.2);
      if (sign) {
        isHoveringSign = true;
        const preview = sign.text.replace(/\n/g, " ").slice(0, 45);
        foundEntity = `📜 Placa: "${preview}${sign.text.length > 45 ? "..." : ""}" (Clique para ler)`;
      }
    }
    if (!isHoveringSign && !foundEntity && state.map.layers.houses) {
      const house = state.map.houses.find(h => h.center[2] === state.map.z && Math.hypot(h.center[0] - worldX, h.center[1] - worldY) <= 2);
      if (house) foundEntity = `🏰 Casa: ${house.name}`;
    }

    if (!mapDragActive) {
      canvas.style.cursor = isHoveringSign ? "pointer" : "crosshair";
    }

    updateHUD(worldX, worldY, state.map.z, foundEntity);
    if (!mapDragActive) {
      renderMapCanvas();
    }
  });

  canvas.addEventListener("click", (e) => {
    if (mapDragMoved) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const tileSize = 20 * state.map.zoom;
    const halfW = canvas.width / 2;
    const halfH = canvas.height / 2;
    const worldX = Math.floor(state.map.centerX + (mouseX - halfW) / tileSize);
    const worldY = Math.floor(state.map.centerY + (mouseY - halfH) / tileSize);

    // 1. Precise click detection on text balloon or sign icon visible on screen
    if (state.map.layers.signs && state.map.visibleSignsOnScreen && state.map.visibleSignsOnScreen.length > 0) {
      const hit = state.map.visibleSignsOnScreen.find(s => {
        if (s.bubble && mouseX >= s.bubble.x && mouseX <= s.bubble.x + s.bubble.w &&
            mouseY >= s.bubble.y && mouseY <= s.bubble.y + s.bubble.h) {
          return true;
        }
        if (Math.hypot(mouseX - s.anchor.cx, mouseY - s.anchor.cy) <= s.anchor.r) {
          return true;
        }
        return false;
      });
      if (hit) {
        state.map.selectedSign = hit.sign;
        state.map.selectedSpawn = null;
        state.map.selectedNpc = null;
        renderMapCanvas();
        openSignModal(hit.sign);
        return;
      }
    }

    // 2. Detection with world coordinate tolerance (1.2 tiles radius)
    if (state.map.layers.signs && state.map.signs) {
      const sign = state.map.signs.find(s => s.z === state.map.z && Math.hypot(s.x - worldX, s.y - worldY) <= 1.2);
      if (sign) {
        state.map.selectedSign = sign;
        state.map.selectedSpawn = null;
        state.map.selectedNpc = null;
        renderMapCanvas();
        openSignModal(sign);
        return;
      }
    }

    if (state.map.layers.monsters) {
      const spawn = state.map.spawns.find(s => s.z === state.map.z && Math.hypot(s.x - worldX, s.y - worldY) <= Math.max(1.5, (s.radius || 1)));
      if (spawn) {
        state.map.selectedSpawn = spawn;
        state.map.selectedSign = null;
        state.map.selectedNpc = null;
        renderMapCanvas();
        return;
      }
    }

    if (state.map.layers.npcs) {
      const npc = state.map.npcs.find(n => n.z === state.map.z && n.x === worldX && n.y === worldY);
      if (npc) {
        state.map.selectedNpc = npc;
        state.map.selectedSpawn = null;
        state.map.selectedSign = null;
        renderMapCanvas();
        return;
      }
    }

    state.map.selectedSign = null;
    state.map.selectedSpawn = null;
    state.map.selectedNpc = null;
    renderMapCanvas();
  });

  canvas.addEventListener("wheel", (e) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.15 : -0.15;
    changeMapZoom(delta);
  }, { passive: false });

  // Keyboard navigation for map: Arrow keys to move, + to go up a floor, - to go down a floor
  canvas.setAttribute("tabindex", "0");
  canvas.style.outline = "none";

  let mapChunkDebounceTimer = null;
  function requestMapChunkDebounced(x, y, z) {
    if (mapChunkDebounceTimer) clearTimeout(mapChunkDebounceTimer);
    mapChunkDebounceTimer = setTimeout(() => {
      const dist = Math.hypot(x - mapLastLoadedCenterX, y - mapLastLoadedCenterY);
      if (dist >= 6 || z !== mapLastLoadedZ) {
        loadMapChunk(x, y, z);
      }
    }, 180);
  }

  function handleMapKeyDown(e) {
    // Ignore keydown if user is currently typing in an input, textarea or select
    const targetTag = e.target?.tagName?.toLowerCase();
    if (e.target?.isContentEditable || targetTag === "input" || targetTag === "textarea" || targetTag === "select") {
      return;
    }

    // Only process map keyboard shortcuts when on the Minimap tab
    if (state.currentTab !== "tab-map") return;

    let step = e.shiftKey ? 8 : (e.ctrlKey ? 16 : 2);
    let handled = false;

    if (e.key === "ArrowUp") {
      state.map.centerY -= step;
      handled = true;
    } else if (e.key === "ArrowDown") {
      state.map.centerY += step;
      handled = true;
    } else if (e.key === "ArrowLeft") {
      state.map.centerX -= step;
      handled = true;
    } else if (e.key === "ArrowRight") {
      state.map.centerX += step;
      handled = true;
    } else if (e.key === "+" || e.code === "NumpadAdd" || (e.shiftKey && (e.key === "=" || e.code === "Equal"))) {
      if (e.shiftKey) {
        // Shift + "+": Zoom In
        changeMapZoom(0.25);
        handled = true;
      } else {
        // "+": Subir um andar: Z diminui (ex: 7 -> 6)
        if (state.map.z > 0) {
          setMapPosition(state.map.centerX, state.map.centerY, state.map.z - 1);
          handled = true;
        }
      }
    } else if (e.key === "-" || e.code === "NumpadSubtract" || (e.shiftKey && (e.key === "_" || e.code === "Minus"))) {
      if (e.shiftKey) {
        // Shift + "-": Zoom Out
        changeMapZoom(-0.25);
        handled = true;
      } else {
        // "-": Descer um andar: Z aumenta (ex: 7 -> 8)
        if (state.map.z < 15) {
          setMapPosition(state.map.centerX, state.map.centerY, state.map.z + 1);
          handled = true;
        }
      }
    } else if (e.key === "=") {
      // Subir andar com tecla '=' sem Shift (se o teclado tiver '+' como Shift + '=')
      if (state.map.z > 0) {
        setMapPosition(state.map.centerX, state.map.centerY, state.map.z - 1);
        handled = true;
      }
    }

    if (handled) {
      e.preventDefault();
      const inputX = document.getElementById("map-input-x");
      const inputY = document.getElementById("map-input-y");
      if (inputX) inputX.value = state.map.centerX;
      if (inputY) inputY.value = state.map.centerY;
      updateHUD(state.map.centerX, state.map.centerY, state.map.z);
      renderMapCanvas();
      requestMapChunkDebounced(state.map.centerX, state.map.centerY, state.map.z);
    }
  }

  window.addEventListener("keydown", handleMapKeyDown);
}

const sectorImagesCache = {};
const mapOutfitCache = {};

function getMapOutfitImage(lookType, colors = "0-0-0-0", isItemOutfit = false, itemOutfitId = 0) {
  if (isItemOutfit && itemOutfitId > 0) {
    const key = `item_${itemOutfitId}`;
    if (!mapOutfitCache[key]) {
      const obj = { img: new Image(), loaded: false, failed: false };
      obj.img.src = `/api/item_sprite/${itemOutfitId}?zoom=1`;
      obj.img.onload = () => { obj.loaded = true; renderMapCanvas(); };
      obj.img.onerror = () => { obj.failed = true; };
      mapOutfitCache[key] = obj;
    }
    return mapOutfitCache[key];
  }

  if (!lookType || lookType <= 0) return null;
  const cleanColors = colors || "0-0-0-0";
  const key = `outfit_${lookType}_${cleanColors}`;
  if (!mapOutfitCache[key]) {
    const obj = { img: new Image(), loaded: false, failed: false };
    obj.img.src = `/api/outfit_sprite/${lookType}?dir=2&colors=${encodeURIComponent(cleanColors)}&zoom=1`;
    obj.img.onload = () => { obj.loaded = true; renderMapCanvas(); };
    obj.img.onerror = () => { obj.failed = true; };
    mapOutfitCache[key] = obj;
  }
  return mapOutfitCache[key];
}

function renderMapCanvas() {
  const canvas = document.getElementById("map-canvas");
  if (!canvas) return;
  const viewport = document.getElementById("map-viewport");
  if (viewport && viewport.clientWidth > 0 && (canvas.width !== viewport.clientWidth || canvas.height !== viewport.clientHeight)) {
    canvas.width = viewport.clientWidth;
    canvas.height = viewport.clientHeight;
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const w = canvas.width;
  const h = canvas.height;
  const tileSize = 20 * state.map.zoom;
  const halfW = w / 2;
  const halfH = h / 2;

  // Map background color (classic Tibia style)
  if (state.map.z <= 7) {
    ctx.fillStyle = "#092f54"; // Deep surface ocean
  } else {
    ctx.fillStyle = "#0c0f17"; // Subsolo / Cavernas
  }
  ctx.fillRect(0, 0, w, h);

  // Calculate visible world coordinate bounds
  const minWorldX = Math.floor(state.map.centerX - halfW / tileSize);
  const maxWorldX = Math.ceil(state.map.centerX + halfW / tileSize);
  const minWorldY = Math.floor(state.map.centerY - halfH / tileSize);
  const maxWorldY = Math.ceil(state.map.centerY + halfH / tileSize);

  const minSecX = Math.floor(minWorldX / 32);
  const maxSecX = Math.floor(maxWorldX / 32);
  const minSecY = Math.floor(minWorldY / 32);
  const maxSecY = Math.floor(maxWorldY / 32);

  // Tibia Isometric 2.5D Elevation Offset:
  // In classic Tibia perspective, each floor above ground (Z < 7) is shifted 1 SQM to North-West (-1 X, -1 Y)
  // relative to the floor below it.
  const getFloorElevationOffset = (floorZ) => {
    if (floorZ < 7) {
      const elevation = 7 - floorZ;
      return {
        sqmX: -elevation,
        sqmY: -elevation,
        pxX: -elevation * tileSize,
        pxY: -elevation * tileSize
      };
    }
    return { sqmX: 0, sqmY: 0, pxX: 0, pxY: 0 };
  };

  const currentFloorOffset = getFloorElevationOffset(state.map.z);

  // Helper to render sectors of a specific floor with perspective elevation
  const drawFloorSectors = (targetZ) => {
    const floorOffset = getFloorElevationOffset(targetZ);
    // Relative shift between target floor and current camera view
    const shiftPxX = floorOffset.pxX - currentFloorOffset.pxX;
    const shiftPxY = floorOffset.pxY - currentFloorOffset.pxY;

    for (let sx = minSecX; sx <= maxSecX; sx++) {
      for (let sy = minSecY; sy <= maxSecY; sy++) {
        const secScreenX = Math.floor(halfW + (sx * 32 - state.map.centerX) * tileSize + shiftPxX);
        const secScreenY = Math.floor(halfH + (sy * 32 - state.map.centerY) * tileSize + shiftPxY);
        const secPixelSize = Math.ceil(32 * tileSize);

        if (secScreenX + secPixelSize < 0 || secScreenX > w || secScreenY + secPixelSize < 0 || secScreenY > h) {
          continue;
        }

        const cacheKey = `${sx}_${sy}_${targetZ}`;
        let cached = sectorImagesCache[cacheKey];

        if (!cached) {
          cached = { img: new Image(), loaded: false, failed: false };
          // Native 32x32 scale for sharp rendering
          cached.img.src = `/api/map/sector_image/${sx}/${sy}/${targetZ}?scale=32`;
          cached.img.onload = () => {
            cached.loaded = true;
            renderMapCanvas();
          };
          cached.img.onerror = () => {
            cached.failed = true;
          };
          sectorImagesCache[cacheKey] = cached;
        }

        if (cached.loaded && cached.img.naturalWidth > 0) {
          ctx.imageSmoothingEnabled = false; // Preserve crisp pixel-art without blur
          ctx.drawImage(cached.img, secScreenX, secScreenY, secPixelSize, secPixelSize);
        }
      }
    }
  };

  // 1. Shading style:
  // If on upper floor (Z < 7) and option active, render ground (Z=7) up to Z+1 with dark veil
  if (state.map.layers.lowerFloors && state.map.z < 7) {
    for (let fz = 7; fz > state.map.z; fz--) {
      drawFloorSectors(fz);
      // Sombra gradual do RME sobre o andar inferior
      ctx.fillStyle = "rgba(0, 0, 0, 0.44)";
      ctx.fillRect(0, 0, w, h);
    }
  }

  // 2. Renderiza o andar atual (em 100% de nitidez e brilho nativo, sem sombra)
  drawFloorSectors(state.map.z);

  // Grid opcional
  if (state.map.layers.grid && tileSize >= 8) {
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.lineWidth = 1;
    for (let gx = minWorldX; gx <= maxWorldX; gx++) {
      const px = Math.floor(halfW + (gx - state.map.centerX) * tileSize);
      ctx.beginPath();
      ctx.moveTo(px, 0);
      ctx.lineTo(px, h);
      ctx.stroke();
    }
    for (let gy = minWorldY; gy <= maxWorldY; gy++) {
      const py = Math.floor(halfH + (gy - state.map.centerY) * tileSize);
      ctx.beginPath();
      ctx.moveTo(0, py);
      ctx.lineTo(w, py);
      ctx.stroke();
    }
  }

  // Renderiza Casas (Discreto e Limpo)
  if (state.map.layers.houses && state.map.houses.length > 0) {
    state.map.houses.forEach(house => {
      const [hx, hy, hz] = house.center;
      if (hz !== state.map.z) return;

      const sx = halfW + (hx - state.map.centerX) * tileSize + tileSize / 2;
      const sy = halfH + (hy - state.map.centerY) * tileSize + tileSize / 2;

      if (sx < -60 || sx > w + 60 || sy < -60 || sy > h + 60) return;

      const dotRadius = Math.min(3.5, Math.max(2, tileSize * 0.16));
      ctx.fillStyle = "#fbbf24";
      ctx.beginPath();
      ctx.arc(sx, sy, dotRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#78350f";
      ctx.lineWidth = 1;
      ctx.stroke();

      if (state.map.zoom >= 0.85) {
        ctx.font = "bold 10px Tahoma, Verdana, Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.lineJoin = "round";
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 2.5;
        ctx.strokeText(house.name, sx, sy + tileSize * 0.5 + 8);
        ctx.fillStyle = "#fef08a";
        ctx.fillText(house.name, sx, sy + tileSize * 0.5 + 8);
      }
    });
  }

  // Renderiza Spawns de Monstros (Com Outfits Reais e Design Limpo)
  if (state.map.layers.monsters && state.map.spawns.length > 0) {
    state.map.spawns.forEach(s => {
      if (s.z !== state.map.z) return;

      const sx = halfW + (s.x - state.map.centerX) * tileSize + tileSize / 2;
      const sy = halfH + (s.y - state.map.centerY) * tileSize + tileSize / 2;

      if (sx < -80 || sx > w + 80 || sy < -80 || sy > h + 80) return;

      const isHovered = state.map.hoveredSpawn && (state.map.hoveredSpawn.x === s.x && state.map.hoveredSpawn.y === s.y);
      const isSelected = state.map.selectedSpawn && (state.map.selectedSpawn.x === s.x && state.map.selectedSpawn.y === s.y);

      // Radius circle: ONLY if selected or hovered
      if (isSelected || isHovered) {
        const radiusPx = (s.radius || 1) * tileSize;
        ctx.strokeStyle = "rgba(239, 68, 68, 0.85)";
        ctx.fillStyle = "rgba(239, 68, 68, 0.10)";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.arc(sx, sy, radiusPx, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.setLineDash([]);
      }

      let drewOutfit = false;
      let outfitH = tileSize;
      const isItemOutfit = (s.is_item_outfit || (s.look_type === 0 && (s.corpse || 0) > 0));
      const itemOutfitId = s.corpse || 0;
      if (state.map.layers.outfits && ((s.look_type && s.look_type > 0) || (isItemOutfit && itemOutfitId > 0)) && state.map.zoom >= 0.45) {
        const outfitData = getMapOutfitImage(s.look_type, s.look_colors, isItemOutfit, itemOutfitId);
        if (outfitData && outfitData.loaded && outfitData.img.naturalWidth > 0) {
          const nw = outfitData.img.naturalWidth;
          const nh = outfitData.img.naturalHeight;
          const drawW = (nw / 32) * tileSize;
          const drawH = (nh / 32) * tileSize;
          outfitH = drawH;
          const drawX = sx - drawW / 2;
          const drawY = sy + (tileSize / 2) - drawH;

          // Soft shadow under feet
          ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
          ctx.beginPath();
          ctx.ellipse(sx, sy + tileSize * 0.32, Math.max(3, tileSize * 0.36), Math.max(2, tileSize * 0.16), 0, 0, Math.PI * 2);
          ctx.fill();

          ctx.imageSmoothingEnabled = false;
          ctx.drawImage(outfitData.img, drawX, drawY, drawW, drawH);
          drewOutfit = true;

          // Selection outline
          if (isSelected || isHovered) {
            ctx.strokeStyle = "#ef4444";
            ctx.lineWidth = 1.5;
            ctx.strokeRect(drawX - 2, drawY - 2, drawW + 4, drawH + 4);
          }
        }
      }

      // Marcador Pontual alternativo (se outfits desligados ou imagem carregando)
      if (!drewOutfit) {
        const dotRadius = Math.min(3.5, Math.max(2.2, tileSize * 0.16));
        ctx.fillStyle = (isSelected || isHovered) ? "#ff3333" : "#ef4444";
        ctx.beginPath();
        ctx.arc(sx, sy, (isSelected || isHovered) ? dotRadius + 1.2 : dotRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Monster Name in Green with Black Outline (Displayed at zoom >= 0.75 or selected/hovered)
      if (state.map.zoom >= 0.75 || isSelected || isHovered) {
        ctx.font = "bold 10px Tahoma, Verdana, Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.lineJoin = "round";
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 2.5;
        const label = (s.amount > 1) ? `${s.name} (${s.amount})` : s.name;
        const textY = drewOutfit ? (sy + (tileSize / 2) - outfitH - 3) : (sy - 5);
        ctx.strokeText(label, sx, textY);
        ctx.fillStyle = "#4ade80"; // Verde vibrante
        ctx.fillText(label, sx, textY);
      }
    });
  }

  // Renderiza NPCs (Com Outfits Reais e Nome em Verde Vivo)
  if (state.map.layers.npcs && state.map.npcs.length > 0) {
    state.map.npcs.forEach(n => {
      if (n.z !== state.map.z) return;

      const sx = halfW + (n.x - state.map.centerX) * tileSize + tileSize / 2;
      const sy = halfH + (n.y - state.map.centerY) * tileSize + tileSize / 2;

      if (sx < -60 || sx > w + 60 || sy < -60 || sy > h + 60) return;

      const isHovered = state.map.hoveredCoord && (state.map.hoveredCoord.x === n.x && state.map.hoveredCoord.y === n.y);
      const isSelected = state.map.selectedNpc && (state.map.selectedNpc.x === n.x && state.map.selectedNpc.y === n.y);

      let drewOutfit = false;
      let outfitH = tileSize;
      if (state.map.layers.outfits && state.map.zoom >= 0.45) {
        const outfitData = getMapOutfitImage(n.outfit_type, n.outfit_colors, n.is_item_outfit, n.item_outfit_id);
        if (outfitData && outfitData.loaded && outfitData.img.naturalWidth > 0) {
          const nw = outfitData.img.naturalWidth;
          const nh = outfitData.img.naturalHeight;
          const drawW = (nw / 32) * tileSize;
          const drawH = (nh / 32) * tileSize;
          outfitH = drawH;
          const drawX = sx - drawW / 2;
          const drawY = sy + (tileSize / 2) - drawH;

          // Shadow under feet
          ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
          ctx.beginPath();
          ctx.ellipse(sx, sy + tileSize * 0.32, Math.max(3, tileSize * 0.36), Math.max(2, tileSize * 0.16), 0, 0, Math.PI * 2);
          ctx.fill();

          ctx.imageSmoothingEnabled = false;
          ctx.drawImage(outfitData.img, drawX, drawY, drawW, drawH);
          drewOutfit = true;

          if (isSelected || isHovered) {
            ctx.strokeStyle = "#38bdf8";
            ctx.lineWidth = 1.5;
            ctx.strokeRect(drawX - 2, drawY - 2, drawW + 4, drawH + 4);
          }
        }
      }

      // Marcador pontual alternativo (se outfits desligados ou imagem carregando)
      if (!drewOutfit) {
        const dotRadius = Math.min(4, Math.max(2.5, tileSize * 0.18));
        ctx.fillStyle = "#0284c7";
        ctx.beginPath();
        ctx.arc(sx, sy, (isHovered || isSelected) ? dotRadius + 1.5 : dotRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // Nome do NPC em Verde Vivo com Contorno Preto (Em zoom >= 0.75 ou hover/selecionado)
      if (state.map.zoom >= 0.75 || isHovered || isSelected) {
        ctx.font = "bold 10px Tahoma, Verdana, Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.lineJoin = "round";
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 2.5;
        const textY = drewOutfit ? (sy + (tileSize / 2) - outfitH - 3) : (sy - 6);
        ctx.strokeText(n.name, sx, textY);
        ctx.fillStyle = "#22c55e"; // Classic Tibia green
        ctx.fillText(n.name, sx, textY);
      }
    });
  }

  // Renderiza Placas e Murais com Texto (.sec)
  state.map.visibleSignsOnScreen = [];
  if (state.map.layers.signs && state.map.signs && state.map.signs.length > 0) {
    state.map.signs.forEach(sign => {
      if (sign.z !== state.map.z) return;

      const sx = halfW + (sign.x - state.map.centerX) * tileSize + tileSize / 2;
      const sy = halfH + (sign.y - state.map.centerY) * tileSize + tileSize / 2;

      if (sx < -120 || sx > w + 120 || sy < -120 || sy > h + 120) return;

      const isHovered = state.map.hoveredCoord && (state.map.hoveredCoord.x === sign.x && state.map.hoveredCoord.y === sign.y);
      const isSelected = state.map.selectedSign && (state.map.selectedSign.x === sign.x && state.map.selectedSign.y === sign.y);

      // Discreet sign dot/icon
      const badgeR = Math.min(4.5, Math.max(2.5, tileSize * 0.18));
      ctx.fillStyle = (isSelected || isHovered) ? "#f59e0b" : "#d97706";
      ctx.beginPath();
      ctx.arc(sx, sy, (isSelected || isHovered) ? badgeR + 1.5 : badgeR, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1;
      ctx.stroke();

      let balloonRect = null;

      // Styled parchment floating balloon
      // Displayed if zoom >= 0.95 or on selection/hover
      if (state.map.zoom >= 0.95 || isSelected || isHovered) {
        const displayLines = formatSignBalloonLines(sign.text, 22, 3);
        if (displayLines.length > 0) {
          ctx.font = "bold 9px Tahoma, Verdana, Inter, sans-serif";
          ctx.textAlign = "center";

          let maxLineW = 0;
          displayLines.forEach(l => {
            const lw = ctx.measureText(l).width;
            if (lw > maxLineW) maxLineW = lw;
          });

          const padX = 8;
          const padY = 5;
          const lineH = 13;
          const bubbleW = Math.min(170, Math.max(54, maxLineW + padX * 2));
          const bubbleH = displayLines.length * lineH + padY * 2;
          const bubbleX = sx - bubbleW / 2;
          const bubbleY = sy - tileSize * 0.5 - bubbleH - 4;

          balloonRect = { x: bubbleX, y: bubbleY, w: bubbleW, h: bubbleH };

          // Medieval parchment background
          ctx.fillStyle = (isSelected || isHovered) ? "rgba(24, 18, 10, 0.96)" : "rgba(30, 24, 16, 0.90)";
          ctx.strokeStyle = (isSelected || isHovered) ? "#f59e0b" : "rgba(217, 119, 6, 0.8)";
          ctx.lineWidth = (isSelected || isHovered) ? 1.5 : 1;

          const r = 4;
          ctx.beginPath();
          ctx.moveTo(bubbleX + r, bubbleY);
          ctx.lineTo(bubbleX + bubbleW - r, bubbleY);
          ctx.quadraticCurveTo(bubbleX + bubbleW, bubbleY, bubbleX + bubbleW, bubbleY + r);
          ctx.lineTo(bubbleX + bubbleW, bubbleY + bubbleH - r);
          ctx.quadraticCurveTo(bubbleX + bubbleW, bubbleY + bubbleH, bubbleX + bubbleW - r, bubbleY + bubbleH);
          ctx.lineTo(bubbleX + bubbleW / 2 + 4, bubbleY + bubbleH);
          ctx.lineTo(bubbleX + bubbleW / 2, bubbleY + bubbleH + 4);
          ctx.lineTo(bubbleX + bubbleW / 2 - 4, bubbleY + bubbleH);
          ctx.lineTo(bubbleX + r, bubbleY + bubbleH);
          ctx.quadraticCurveTo(bubbleX, bubbleY + bubbleH, bubbleX, bubbleY + bubbleH - r);
          ctx.lineTo(bubbleX, bubbleY + r);
          ctx.quadraticCurveTo(bubbleX, bubbleY, bubbleX + r, bubbleY);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          displayLines.forEach((line, idx) => {
            const ly = bubbleY + padY + (idx + 1) * lineH - 2;
            ctx.fillStyle = (idx === 0) ? "#fef08a" : "#fef9c3";
            ctx.fillText(line, sx, ly);
          });
        }
      }

      state.map.visibleSignsOnScreen.push({
        sign: sign,
        anchor: { cx: sx, cy: sy, r: Math.max(tileSize * 0.7, 14) },
        bubble: balloonRect
      });
    });
  }

  // Indicador de Cursor Selecionado / Hover
  if (state.map.hoveredCoord) {
    const hx = Math.floor(halfW + (state.map.hoveredCoord.x - state.map.centerX) * tileSize);
    const hy = Math.floor(halfH + (state.map.hoveredCoord.y - state.map.centerY) * tileSize);
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 2;
    ctx.strokeRect(hx, hy, tileSize, tileSize);
  }

  // Ponto Central do Viewport (Mira suave)
  ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(halfW - 10, halfH);
  ctx.lineTo(halfW + 10, halfH);
  ctx.moveTo(halfW, halfH - 10);
  ctx.lineTo(halfW, halfH + 10);
  ctx.stroke();
}

function formatSignBalloonLines(text, maxChars = 22, maxLines = 3) {
  if (!text) return [];
  const words = text.replace(/\\n|\n/g, " ").split(/\s+/).filter(w => w.length > 0);
  const lines = [];
  let currentLine = "";

  for (const word of words) {
    if ((currentLine + " " + word).trim().length <= maxChars) {
      currentLine = (currentLine ? currentLine + " " + word : word);
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
      if (lines.length === maxLines - 1) {
        break;
      }
    }
  }
  if (currentLine && lines.length < maxLines) {
    lines.push(currentLine);
  }

  if (words.length > 0) {
    const renderedWords = lines.join(" ").split(/\s+/).length;
    if (renderedWords < words.length && lines.length > 0) {
      const last = lines[lines.length - 1];
      lines[lines.length - 1] = (last.length > maxChars - 3 ? last.slice(0, maxChars - 3) : last) + "...";
    }
  }
  return lines;
}

function openSignModal(sign) {
  if (!sign) return;
  const modal = document.getElementById("map-sign-modal");
  if (!modal) return;

  const titleEl = document.getElementById("map-sign-modal-title");
  const imgEl = document.getElementById("map-sign-modal-img");
  const coordsEl = document.getElementById("map-sign-modal-coords");
  const itemIdEl = document.getElementById("map-sign-modal-itemid");
  const editorRow = document.getElementById("map-sign-modal-editor-row");
  const editorEl = document.getElementById("map-sign-modal-editor");
  const textEl = document.getElementById("map-sign-modal-text");

  const itemId = sign.item_id || 2012;
  if (imgEl) imgEl.src = `/api/item_sprite/${itemId}?zoom=2`;
  if (coordsEl) coordsEl.textContent = `Coords: [${sign.x}, ${sign.y}, ${sign.z}]`;
  if (itemIdEl) itemIdEl.textContent = `Item #${itemId}`;

  // Smart title based on item type
  if (titleEl) {
    if (itemId >= 2814 && itemId <= 2840) {
      titleEl.innerHTML = "📖 Book / Document";
    } else if (itemId >= 2841 && itemId <= 2855) {
      titleEl.innerHTML = "📜 Scroll / Parchment";
    } else if (itemId >= 2435 && itemId <= 2440) {
      titleEl.innerHTML = "📚 Bookshelf Book";
    } else if (itemId === 2597 || itemId === 2598) {
      titleEl.innerHTML = "📋 Blackboard";
    } else if (itemId === 2602 || itemId === 2603) {
      titleEl.innerHTML = "📜 Wall Plaque";
    } else {
      titleEl.innerHTML = "📜 Sign / Inscription";
    }
  }

  if (editorRow && editorEl) {
    if (sign.editor) {
      editorEl.textContent = sign.editor;
      editorRow.style.display = "block";
    } else {
      editorRow.style.display = "none";
    }
  }

  if (textEl) {
    textEl.textContent = sign.text || "(Empty text)";
    textEl.scrollTop = 0;
  }

  // Garantir que o modal esteja anexado diretamente ao body para evitar problemas de stacking context
  if (modal.parentElement !== document.body) {
    document.body.appendChild(modal);
  }

  modal.classList.add("active");
  modal.style.setProperty("display", "flex", "important");
  modal.style.setProperty("visibility", "visible", "important");
  modal.style.setProperty("opacity", "1", "important");
}

let signModalSetupDone = false;
function setupSignModal() {
  if (signModalSetupDone) return;
  signModalSetupDone = true;

  const modal = document.getElementById("map-sign-modal");
  const btnClose = document.getElementById("btn-close-map-sign");
  const btnCloseFooter = document.getElementById("btn-close-map-sign-footer");
  const btnCopy = document.getElementById("btn-copy-sign-text");

  const closeFn = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (modal) {
      modal.classList.remove("active");
      modal.style.setProperty("display", "none", "important");
      modal.style.removeProperty("visibility");
      modal.style.removeProperty("opacity");
    }
  };

  if (btnClose) btnClose.addEventListener("click", closeFn);
  if (btnCloseFooter) btnCloseFooter.addEventListener("click", closeFn);
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeFn(e);
    });
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.classList.contains("active")) {
      closeFn(e);
    }
  });

  if (btnCopy) {
    btnCopy.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const text = document.getElementById("map-sign-modal-text")?.textContent || "";
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
        showToast("Text copied to clipboard!", "success");
      }
    });
  }
}

// =============================================================================
// FEATURE 2: MOVEUSE QUEST CHEST & DOOR WIZARD
// =============================================================================
function setupQuestWizard() {
  const btnOpen = document.getElementById("btn-open-quest-wizard");
  const modal = document.getElementById("quest-wizard-modal");
  const btnClose = document.getElementById("btn-close-quest-wizard");
  const btnCloseFooter = document.getElementById("btn-close-qw-footer");
  const btnInsert = document.getElementById("btn-qw-insert");

  if (btnOpen && modal) {
    btnOpen.addEventListener("click", () => {
      openQuestWizardModal();
    });
  }

  const closeModal = () => {
    if (modal) modal.style.display = "none";
  };

  if (btnClose) btnClose.addEventListener("click", closeModal);
  if (btnCloseFooter) btnCloseFooter.addEventListener("click", closeModal);

  // Seletores e Inputs reativos
  const chestType = document.getElementById("qw-chest-type");
  const chestCustom = document.getElementById("qw-chest-custom-id");
  const btnPickChest = document.getElementById("btn-qw-pick-chest");

  if (chestType) {
    chestType.addEventListener("change", (e) => {
      if (e.target.value === "custom") {
        if (chestCustom) chestCustom.style.display = "inline-block";
      } else {
        if (chestCustom) chestCustom.style.display = "none";
        state.questWizard.chestId = parseInt(e.target.value) || 1746;
      }
      updateQuestWizardPreview();
    });
  }

  if (chestCustom) {
    chestCustom.addEventListener("input", (e) => {
      state.questWizard.chestId = parseInt(e.target.value) || 1746;
      updateQuestWizardPreview();
    });
  }

  if (btnPickChest) {
    btnPickChest.addEventListener("click", () => {
      openItemPickerModal("Select Quest Chest", (item) => {
        state.questWizard.chestId = item.type_id;
        if (chestType) chestType.value = "custom";
        if (chestCustom) {
          chestCustom.style.display = "inline-block";
          chestCustom.value = item.type_id;
        }
        updateQuestWizardPreview();
      });
    });
  }

  // Trigger Mode & Value
  const triggerMode = document.getElementById("qw-trigger-mode");
  const triggerVal = document.getElementById("qw-trigger-value");
  if (triggerMode) {
    triggerMode.addEventListener("change", (e) => {
      state.questWizard.triggerMode = e.target.value;
      updateQuestWizardPreview();
    });
  }
  if (triggerVal) {
    triggerVal.addEventListener("input", (e) => {
      state.questWizard.triggerValue = e.target.value.trim();
      updateQuestWizardPreview();
    });
  }

  // Reward Item & Count
  const rewardIdInput = document.getElementById("qw-reward-id");
  const rewardCountInput = document.getElementById("qw-reward-count");
  const btnPickReward = document.getElementById("btn-qw-pick-reward");
  const rewardImg = document.getElementById("qw-reward-img");

  const updateRewardThumb = (id) => {
    if (rewardImg) {
      rewardImg.src = `/api/item_sprite/${id}?zoom=1`;
    }
  };

  if (rewardIdInput) {
    rewardIdInput.addEventListener("input", (e) => {
      const id = parseInt(e.target.value) || 0;
      state.questWizard.rewardId = id;
      updateRewardThumb(id);
      updateQuestWizardPreview();
    });
  }

  if (rewardCountInput) {
    rewardCountInput.addEventListener("input", (e) => {
      state.questWizard.rewardCount = parseInt(e.target.value) || 1;
      updateQuestWizardPreview();
    });
  }

  if (btnPickReward) {
    btnPickReward.addEventListener("click", () => {
      openItemPickerModal("Selecionar Item de Recompensa", (item) => {
        state.questWizard.rewardId = item.type_id;
        if (rewardIdInput) rewardIdInput.value = item.type_id;
        updateRewardThumb(item.type_id);
        updateQuestWizardPreview();
      });
    });
  }

  // Storage Key e Mensagens
  const storageKey = document.getElementById("qw-storage-key");
  const msgSuccess = document.getElementById("qw-msg-success");
  const msgEmpty = document.getElementById("qw-msg-empty");

  if (storageKey) {
    storageKey.addEventListener("input", (e) => {
      state.questWizard.storageKey = parseInt(e.target.value) || 10001;
      updateQuestWizardPreview();
    });
  }

  if (msgSuccess) {
    msgSuccess.addEventListener("input", (e) => {
      state.questWizard.msgSuccess = e.target.value;
      updateQuestWizardPreview();
    });
  }

  if (msgEmpty) {
    msgEmpty.addEventListener("input", (e) => {
      state.questWizard.msgEmpty = e.target.value;
      updateQuestWizardPreview();
    });
  }

  // Inserir no moveuse.dat
  if (btnInsert) {
    btnInsert.addEventListener("click", () => {
      insertQuestWizardRule();
      closeModal();
    });
  }
}

function openQuestWizardModal() {
  const modal = document.getElementById("quest-wizard-modal");
  if (!modal) return;
  modal.style.display = "flex";
  updateQuestWizardPreview();
}

function generateQuestWizardRules() {
  const { chestId, triggerMode, triggerValue, rewardId, rewardCount, storageKey, msgSuccess, msgEmpty } = state.questWizard;

  let triggerCond = "";
  if (triggerMode === "actionid" && triggerValue) {
    triggerCond = `, HasAction (Obj1, ${triggerValue})`;
  } else if (triggerMode === "uniqueid" && triggerValue) {
    triggerCond = `, HasUnique (Obj1, ${triggerValue})`;
  } else if (triggerMode === "position" && triggerValue) {
    triggerCond = `, At (Obj1, ${triggerValue})`;
  }

  const ruleSuccess = `Use, IsType (Obj1, ${chestId})${triggerCond}, HasQuestValue (User, ${storageKey}, =, 0) -> Create (User, ${rewardId}, ${rewardCount}), SetQuestValue (User, ${storageKey}, 1), SysMessage (User, "${msgSuccess}")`;
  const ruleEmpty = `Use, IsType (Obj1, ${chestId})${triggerCond}, HasQuestValue (User, ${storageKey}, >, 0) -> SysMessage (User, "${msgEmpty}")`;

  return [ruleSuccess, ruleEmpty];
}

function updateQuestWizardPreview() {
  const preview = document.getElementById("qw-code-preview");
  if (!preview) return;

  const rules = generateQuestWizardRules();
  preview.textContent = `# Rule 1: Initial Reward (Storage == 0)\n${rules[0]}\n\n# Rule 2: Chest Already Opened (Storage > 0)\n${rules[1]}`;
}

function insertQuestWizardRule() {
  const rules = generateQuestWizardRules();

  // Locate or create Quests section
  if (!state.moveuse.sections || state.moveuse.sections.length === 0) {
    state.moveuse.sections = [{ name: "Quests", rules: [], count: 0 }];
    state.moveuse.selectedSectionIndex = 0;
  }

  let sec = state.moveuse.sections[state.moveuse.selectedSectionIndex];
  if (!sec) {
    sec = state.moveuse.sections[0];
  }

  rules.forEach(r => {
    sec.rules.push({
      id: (sec.rules.length + 1),
      section: sec.name,
      trigger: "Use",
      conditions: "",
      actions: "",
      raw: r
    });
  });

  sec.count = sec.rules.length;
  setDirty(true);
  renderMoveUseSections();
  renderMoveUseRules();

  showToast("Quest and Chest rules successfully added to section!", "success");
}

// =============================================================================
// FEATURE 3: CHANGES COMPARATOR (DIFF VIEWER BEFORE SAVE)
// =============================================================================
function setupDiffViewer() {
  const btnOpen = document.getElementById("btn-open-diff");
  const modal = document.getElementById("diff-viewer-modal");
  const btnClose = document.getElementById("btn-close-diff");
  const btnCloseFooter = document.getElementById("btn-close-diff-footer");
  const btnConfirmSave = document.getElementById("btn-diff-save-confirm");

  if (btnOpen) {
    btnOpen.addEventListener("click", () => {
      openDiffViewerModal();
    });
  }

  const closeModal = () => {
    if (modal) modal.style.display = "none";
  };

  if (btnClose) btnClose.addEventListener("click", closeModal);
  if (btnCloseFooter) btnCloseFooter.addEventListener("click", closeModal);

  if (btnConfirmSave) {
    btnConfirmSave.addEventListener("click", () => {
      closeModal();
      document.getElementById("btn-global-save")?.click();
    });
  }
}

async function openDiffViewerModal() {
  const modal = document.getElementById("diff-viewer-modal");
  if (!modal) return;
  modal.style.display = "flex";

  const container = document.getElementById("diff-lines-container");
  const fileBadge = document.getElementById("diff-file-badge");
  const countAdded = document.getElementById("diff-count-added");
  const countRemoved = document.getElementById("diff-count-removed");
  const statusText = document.getElementById("diff-status-text");

  if (container) {
    container.innerHTML = `<div style="padding: 2rem; text-align: center; color: var(--text-muted);">Comparing changes with file on disk...</div>`;
  }

  try {
    let payload = {};

    if (state.currentTab === "tab-monsters") {
      const filename = state.monsters.selectedFilename || "monster.mon";
      fileBadge.textContent = filename;

      const flags = [];
      document.querySelectorAll("input[name='mon-flag']:checked").forEach(chk => flags.push(chk.value));

      payload = {
        file_type: "monster",
        filename: filename,
        monster: {
          filename: filename,
          name: document.getElementById("mon-name")?.value || "",
          race_number: parseInt(document.getElementById("mon-race")?.value) || 0,
          outfit_type: parseInt(document.getElementById("mon-outfit")?.value) || 0,
          outfit_colors: document.getElementById("mon-colors")?.value || "0-0-0-0",
          hitpoints: parseInt(document.getElementById("mon-hp")?.value) || 100,
          experience: parseInt(document.getElementById("mon-exp")?.value) || 0,
          attack: parseInt(document.getElementById("mon-atk")?.value) || 0,
          defend: parseInt(document.getElementById("mon-def")?.value) || 0,
          armor: parseInt(document.getElementById("mon-armor")?.value) || 0,
          speed: parseInt(document.getElementById("mon-speed")?.value) || 50,
          blood: document.getElementById("mon-blood")?.value || "Blood",
          corpse: parseInt(document.getElementById("mon-corpse")?.value) || 0,
          flee_threshold: parseInt(document.getElementById("mon-flee")?.value) || 0,
          poison: parseInt(document.getElementById("mon-poison")?.value) || 0,
          flags: flags,
          spells_raw: currentMonsterSpells || [],
          talk: currentMonsterTalk || [],
          inventory: currentMonsterLoot || []
        }
      };
    } else if (state.currentTab === "tab-moveuse") {
      fileBadge.textContent = "moveuse.dat";
      payload = {
        file_type: "moveuse",
        sections: state.moveuse.sections || []
      };
    } else if (state.currentTab === "tab-npcs") {
      const filename = state.npcs.selectedFilename || "npc.npc";
      fileBadge.textContent = filename;
      payload = {
        file_type: "npc",
        filename: filename,
        modified_text: ""
      };
    } else if (state.currentTab === "tab-objects") {
      fileBadge.textContent = "objects.srv";
      payload = {
        file_type: "objects",
        modified_text: ""
      };
    } else {
      fileBadge.textContent = "Editor";
      if (container) {
        container.innerHTML = `<div style="padding: 2rem; text-align: center; color: var(--text-muted);">This tab does not have a directly trackable text file for comparison.</div>`;
      }
      return;
    }

    const res = await fetch("/api/diff", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const result = await res.json();

    if (result.error) {
      if (container) {
        container.innerHTML = `<div class="error-box" style="padding:1rem;">Error generating diff: ${escapeHtmlText(result.error)}</div>`;
      }
      return;
    }

    if (countAdded) countAdded.textContent = `+${result.added_count || 0} Added`;
    if (countRemoved) countRemoved.textContent = `-${result.removed_count || 0} Removed`;

    if (!result.has_diff || !result.diff_lines || result.diff_lines.length === 0) {
      if (statusText) statusText.textContent = "No changes detected compared to the file saved on disk.";
      if (container) {
        container.innerHTML = `
          <div style="padding: 3rem; text-align: center; color: #10b981;">
            <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🎉</div>
            <h4 style="color: #fff; margin-bottom: 0.25rem;">No pending changes</h4>
            <p style="color: var(--text-muted); font-size: 0.9rem;">The current state is identical to the version saved on disk.</p>
          </div>
        `;
      }
      return;
    }

    if (statusText) {
      statusText.textContent = `Reviewing ${result.diff_lines.length} lines of changes before saving.`;
    }

    // Rendering Git-styled diff lines
    if (container) {
      container.innerHTML = result.diff_lines.map(line => {
        if (line.startsWith("+") && !line.startsWith("+++")) {
          return `<div class="diff-line add"><span class="diff-prefix">+</span><span class="diff-text">${escapeHtmlText(line.slice(1))}</span></div>`;
        } else if (line.startsWith("-") && !line.startsWith("---")) {
          return `<div class="diff-line del"><span class="diff-prefix">-</span><span class="diff-text">${escapeHtmlText(line.slice(1))}</span></div>`;
        } else if (line.startsWith("@@")) {
          return `<div class="diff-line hunk"><span class="diff-prefix">@</span><span class="diff-text">${escapeHtmlText(line)}</span></div>`;
        } else {
          return `<div class="diff-line ctx"><span class="diff-prefix">&nbsp;</span><span class="diff-text">${escapeHtmlText(line)}</span></div>`;
        }
      }).join("");
    }
  } catch (err) {
    if (container) {
      container.innerHTML = `<div class="error-box" style="padding:1rem;">Connection error calculating diff: ${err.message}</div>`;
    }
  }
}


