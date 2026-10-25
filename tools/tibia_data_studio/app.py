"""
Tibia Data Studio - Backend Server (Python Flask API)
Fornece APIs REST de alto desempenho para Itens, Monstros, NPCs, MoveUse e Sprites.
"""

import os
import sys
import json
import random
import re
import difflib
from io import BytesIO
from flask import Flask, jsonify, request, send_file, render_template
from PIL import Image

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, BASE_DIR)

from core.spr_reader import SprReader
from core.dat_reader import DatReader
from core.objects_parser import ObjectsParser, ServerObject
from core.moveuse_parser import MoveUseParser, MoveUseRule, MoveUseSection
from core.monster_parser import MonsterManager, MonsterData, LootItem
from core.npc_parser import NpcManager, NpcData
from core.backup_manager import BackupManager
from core.functions_doc import get_full_catalog
from core.outfit_colorizer import colorize_tile, parse_outfit_colors
from core.map_parser import MapManager

app = Flask(__name__, static_folder="static", template_folder="templates")

# Estados globais
spr_reader = SprReader()
dat_reader = DatReader()
objects_parser = ObjectsParser()
moveuse_parser = MoveUseParser()
monster_manager = MonsterManager()
npc_manager = NpcManager()
backup_mgr = BackupManager()
map_manager = MapManager()

CONFIG_FILE = os.path.join(BASE_DIR, "config.json")

current_config = {
    "data_path": os.path.abspath(os.path.join(BASE_DIR, "..", "..", "..", "CipSoft Server", "tibia-game_data")),
    "client_path": r"C:\Users\Rodrigo\Desktop\Jogos\Tibia772"
}

def load_saved_config():
    global current_config
    if os.path.exists(CONFIG_FILE):
        try:
            with open(CONFIG_FILE, "r", encoding="utf-8") as f:
                saved = json.load(f)
                current_config.update(saved)
        except Exception as e:
            print(f"Erro ao carregar config.json: {e}")

def save_config_to_file():
    try:
        with open(CONFIG_FILE, "w", encoding="utf-8") as f:
            json.dump(current_config, f, indent=2)
    except Exception as e:
        print(f"Erro ao salvar config.json: {e}")

def auto_load_data():
    """Loads default server and Tibia client data"""
    load_saved_config()
    
    # Carrega dados do servidor
    data_path = current_config["data_path"]
    if os.path.exists(data_path):
        obj_path = os.path.join(data_path, "dat", "objects.srv")
        if os.path.exists(obj_path):
            objects_parser.load(obj_path)

        mv_path = os.path.join(data_path, "dat", "moveuse.dat")
        if os.path.exists(mv_path):
            moveuse_parser.load(mv_path)

        mon_path = os.path.join(data_path, "mon")
        if os.path.exists(mon_path):
            monster_manager.load_all(mon_path)

        npc_path = os.path.join(data_path, "npc")
        if os.path.exists(npc_path):
            npc_manager.load_all(npc_path)

        # Carrega mapa, monsterhomes e casas
        map_manager.load_all(data_path)
        map_manager.objects_parser = objects_parser
        map_manager.link_monsters(monster_manager.get_all_list())

    # Carrega arquivos do cliente (Tibia.spr e Tibia.dat)
    client_path = current_config["client_path"]
    if client_path and os.path.exists(client_path):
        load_client_files(client_path)

def load_client_files(client_path: str):
    # Looks for Tibia.spr (case-insensitive)
    spr_path = os.path.join(client_path, "Tibia.spr")
    if not os.path.exists(spr_path):
        spr_path = os.path.join(client_path, "tibia.spr")

    # Procura Tibia.dat
    dat_path = os.path.join(client_path, "Tibia.dat")
    if not os.path.exists(dat_path):
        dat_path = os.path.join(client_path, "tibia.dat")

    if os.path.exists(spr_path):
        spr_reader.load(spr_path)
    if os.path.exists(dat_path):
        dat_reader.load(dat_path)

# ----------------- ROTAS WEB & STATIC -----------------

@app.route("/")
def index():
    return render_template("index.html")

# ----------------- CONFIGURATION & DIRECTORIES -----------------

@app.route("/api/config", methods=["GET"])
def get_config():
    return jsonify({
        "data_path": current_config["data_path"],
        "client_path": current_config["client_path"],
        "objects_loaded": objects_parser.is_loaded,
        "objects_count": len(objects_parser.objects),
        "moveuse_loaded": moveuse_parser.is_loaded,
        "moveuse_sections": len(moveuse_parser.sections),
        "monsters_loaded": monster_manager.is_loaded,
        "monsters_count": len(monster_manager.monsters),
        "npcs_loaded": npc_manager.is_loaded,
        "npcs_count": len(npc_manager.npcs),
        "map_loaded": map_manager.is_loaded,
        "sectors_count": len(map_manager.sector_files),
        "spawns_count": len(map_manager.spawns),
        "houses_count": len(map_manager.houses),
        "spr_loaded": spr_reader.is_loaded,
        "spr_count": spr_reader.sprite_count,
        "dat_loaded": dat_reader.is_loaded,
        "dat_items": len(dat_reader.items),
        "dat_creatures": len(dat_reader.creatures)
    })

@app.route("/api/config/load", methods=["POST"])
def set_config_load():
    try:
        data = request.json or {}
        data_path = data.get("data_path", current_config["data_path"]).strip()
        client_path = data.get("client_path", current_config["client_path"]).strip()

        if data_path:
            current_config["data_path"] = data_path
            obj_path = os.path.join(data_path, "dat", "objects.srv")
            if os.path.exists(obj_path):
                objects_parser.load(obj_path)

            mv_path = os.path.join(data_path, "dat", "moveuse.dat")
            if os.path.exists(mv_path):
                moveuse_parser.load(mv_path)

            mon_path = os.path.join(data_path, "mon")
            if os.path.exists(mon_path):
                monster_manager.load_all(mon_path)

            npc_path = os.path.join(data_path, "npc")
            if os.path.exists(npc_path):
                npc_manager.load_all(npc_path)

            map_manager.load_all(data_path)
            map_manager.link_monsters(monster_manager.get_all_list())

        if client_path:
            current_config["client_path"] = client_path
            if os.path.exists(client_path):
                load_client_files(client_path)

        save_config_to_file()
        return get_config()
    except Exception as e:
        print(f"Erro em set_config_load: {e}")
        return jsonify({"error": str(e)}), 500

# ----------------- SPRITES & RENDERING -----------------

@app.route("/api/sprite/<int:sprite_id>")
def get_sprite(sprite_id: int):
    zoom = int(request.args.get("zoom", 1))
    zoom = max(1, min(8, zoom))

    if spr_reader.is_loaded and sprite_id > 0:
        png_bytes = spr_reader.get_sprite_png_bytes(sprite_id, zoom=zoom)
    else:
        img = Image.new("RGBA", (32 * zoom, 32 * zoom), (40, 44, 52, 180))
        buf = BytesIO()
        img.save(buf, format="PNG")
        png_bytes = buf.getvalue()

    return send_file(BytesIO(png_bytes), mimetype="image/png")

def render_thing_composite(thing, zoom=1, anim=0, colors_str="", custom_dir=None):
    """Renders an item or creature by compositing all its tiles (e.g. 64x64, 32x64) and applying outfit colorization, direction and animation"""
    if not thing or not thing.sprites or not spr_reader.is_loaded:
        img = Image.new("RGBA", (32 * zoom, 32 * zoom), (30, 34, 42, 200))
        buf = BytesIO()
        img.save(buf, format="PNG")
        return buf.getvalue()

    width = thing.width
    height = thing.height
    base_img = Image.new("RGBA", (width * 32, height * 32), (0, 0, 0, 0))

    head, body, legs, feet = parse_outfit_colors(colors_str)
    has_mask = (thing.layers >= 2)

    # Custom direction support (0: North, 1: East, 2: South, 3: West)
    if custom_dir is not None and 0 <= custom_dir < thing.pattern_x:
        dir_x = custom_dir
    else:
        dir_x = 2 if thing.pattern_x >= 3 else 0

    anim_idx = anim % max(1, thing.animations)

    for w in range(width):
        for h in range(height):
            px = (width - 1 - w) * 32
            py = (height - 1 - h) * 32

            if has_mask:
                # Layer 0: Base, Layer 1: Mask
                spr_base_id = thing.get_sprite_index(w=w, h=h, l=0, x=dir_x, a=anim_idx)
                spr_mask_id = thing.get_sprite_index(w=w, h=h, l=1, x=dir_x, a=anim_idx)
                
                spr_base = spr_reader.get_sprite_image(spr_base_id) if spr_base_id else None
                spr_mask = spr_reader.get_sprite_image(spr_mask_id) if spr_mask_id else None

                if spr_base:
                    if spr_mask:
                        colored_tile = colorize_tile(spr_base, spr_mask, head, body, legs, feet)
                        base_img.alpha_composite(colored_tile, (px, py))
                    else:
                        base_img.alpha_composite(spr_base, (px, py))
            else:
                for l in range(thing.layers):
                    sprite_id = thing.get_sprite_index(w=w, h=h, l=l, x=dir_x, a=anim_idx)
                    if sprite_id and sprite_id > 0:
                        sprite_img = spr_reader.get_sprite_image(sprite_id)
                        base_img.alpha_composite(sprite_img, (px, py))

    if zoom > 1:
        base_img = base_img.resize((width * 32 * zoom, height * 32 * zoom), Image.Resampling.NEAREST)

    buf = BytesIO()
    base_img.save(buf, format="PNG")
    return buf.getvalue()

@app.route("/api/item_sprite/<int:type_id>")
def get_item_sprite(type_id: int):
    zoom = int(request.args.get("zoom", 1))
    zoom = max(1, min(8, zoom))

    if dat_reader.is_loaded:
        item = dat_reader.get_item(type_id)
        if item:
            png_bytes = render_thing_composite(item, zoom=zoom)
            return send_file(BytesIO(png_bytes), mimetype="image/png")

    img = Image.new("RGBA", (32 * zoom, 32 * zoom), (30, 34, 42, 200))
    buf = BytesIO()
    img.save(buf, format="PNG")
    return send_file(BytesIO(buf.getvalue()), mimetype="image/png")

@app.route("/api/outfit_sprite/<int:look_type>")
def get_outfit_sprite(look_type: int):
    zoom = int(request.args.get("zoom", 1))
    zoom = max(1, min(8, zoom))
    colors_str = request.args.get("colors", "")
    
    dir_param = request.args.get("dir", None)
    anim_param = int(request.args.get("anim", 0))
    custom_dir = int(dir_param) if dir_param is not None and dir_param.isdigit() else None

    # Suporte a Outfits de Item (LookType = 0, com ItemID no colors_str ou ?item=ID)
    # Ex: The Oracle (0, 2031), The Gatekeeper (0, 2031), Frans (0, 3114), Cobra (0, 2051)
    item_id_param = request.args.get("item", None)
    item_id = None
    if item_id_param and item_id_param.isdigit():
        item_id = int(item_id_param)
    elif look_type == 0 and colors_str:
        clean_colors = colors_str.strip()
        if clean_colors.isdigit() and int(clean_colors) > 0:
            item_id = int(clean_colors)

    if item_id and dat_reader.is_loaded:
        item = dat_reader.get_item(item_id)
        if item:
            png_bytes = render_thing_composite(item, zoom=zoom)
            return send_file(BytesIO(png_bytes), mimetype="image/png")

    if dat_reader.is_loaded:
        creature = dat_reader.get_creature(look_type)
        if creature:
            png_bytes = render_thing_composite(creature, zoom=zoom, anim=anim_param, colors_str=colors_str, custom_dir=custom_dir)
            return send_file(BytesIO(png_bytes), mimetype="image/png")

    img = Image.new("RGBA", (32 * zoom, 32 * zoom), (35, 40, 50, 200))
    buf = BytesIO()
    img.save(buf, format="PNG")
    return send_file(BytesIO(buf.getvalue()), mimetype="image/png")

MAGIC_EFFECTS = [
    {"id": 1, "name": "Draw Blood (Red Spark)", "desc": "Red spark from physical impact"},
    {"id": 2, "name": "Lose Energy (Blue Spark)", "desc": "Blue spark from magical energy impact"},
    {"id": 3, "name": "Poff / Puff", "desc": "Blue/gray vanishing smoke puff"},
    {"id": 4, "name": "Block (Yellow Spark)", "desc": "Yellow shield block spark"},
    {"id": 5, "name": "Magic Blue (Energy)", "desc": "Blue magical rays / Teleport"},
    {"id": 6, "name": "Magic Red (Fire)", "desc": "Red magic flame / Fire flare"},
    {"id": 7, "name": "Magic Green (Poison)", "desc": "Green poison spark / Poison flash"},
    {"id": 8, "name": "Hit Area (Fire Area)", "desc": "Fire area burst / Fiery explosion"},
    {"id": 9, "name": "Teleport Yellow", "desc": "Yellow teleport flash / Sparkle"},
    {"id": 10, "name": "Mort Area (Death / SD)", "desc": "Death effect (Sudden Death) / Death burst"},
    {"id": 11, "name": "Sound Green (Music Notes)", "desc": "Green musical notes"},
    {"id": 12, "name": "Sound Red (Music Notes)", "desc": "Red musical notes"},
    {"id": 13, "name": "Poison Area", "desc": "Toxic poison cloud / Poison area"},
    {"id": 14, "name": "Yellow Energy", "desc": "Yellow shockwave / Energy discharge"},
    {"id": 15, "name": "Explosion", "desc": "Ground explosion (Explosion rune)"},
    {"id": 16, "name": "Plant Attack (Stones)", "desc": "Falling stones / Plant attack"},
    {"id": 17, "name": "Blue Energy (Lightning)", "desc": "Blue lightning beam / Energy strike"},
    {"id": 18, "name": "Firework (Giant Explosion)", "desc": "Fireworks burst with stars"},
    {"id": 19, "name": "Dice Roll", "desc": "Rolling dice (1 to 6)"},
    {"id": 20, "name": "Gift / Present", "desc": "Animated holiday gift box"},
    {"id": 21, "name": "Critical / Tear", "desc": "Critical strike spark / Glint tears"},
    {"id": 22, "name": "Stun / Thunder", "desc": "Thunder stun / Daze spark"},
    {"id": 23, "name": "Assassin Smoke", "desc": "Black assassin smoke"},
    {"id": 24, "name": "Bubble", "desc": "Magical water bubbles"},
    {"id": 25, "name": "Hearts / Love", "desc": "Red floating love hearts"}
]

@app.route("/api/effects", methods=["GET"])
def get_magic_effects():
    return jsonify({"effects": MAGIC_EFFECTS})

@app.route("/api/effect_sprite/<int:effect_id>")
def get_effect_sprite(effect_id: int):
    zoom = int(request.args.get("zoom", 1))
    zoom = max(1, min(8, zoom))

    if dat_reader.is_loaded:
        effect = dat_reader.effects.get(effect_id)
        if effect and effect.sprites:
            anim_idx = min(len(effect.sprites) // 2, len(effect.sprites) - 1)
            sprite_id = effect.sprites[anim_idx]
            if sprite_id > 0:
                png_bytes = spr_reader.get_sprite_png_bytes(sprite_id, zoom=zoom)
                return send_file(BytesIO(png_bytes), mimetype="image/png")

    img = Image.new("RGBA", (32 * zoom, 32 * zoom), (45, 35, 60, 200))
    buf = BytesIO()
    img.save(buf, format="PNG")
    return send_file(BytesIO(buf.getvalue()), mimetype="image/png")

# ----------------- ITENS (OBJECTS.SRV) -----------------

@app.route("/api/objects", methods=["GET"])
def get_objects():
    query = request.args.get("q", "").lower().strip()
    flag_filter = request.args.get("flag", "").strip()
    page = int(request.args.get("page", 1))
    limit = int(request.args.get("limit", 50))

    all_objs = objects_parser.get_all_list()

    filtered = []
    for obj in all_objs:
        if query:
            match_id = str(obj["type_id"]).startswith(query)
            match_name = query in obj["name"].lower()
            match_desc = query in obj["description"].lower()
            if not (match_id or match_name or match_desc):
                continue

        if flag_filter:
            lower_flags = [f.lower() for f in obj.get("flags", [])]
            obj_name = obj.get("name", "").lower()
            if flag_filter.lower() == "corpse":
                is_corpse = ("corpse" in lower_flags or 
                             ("container" in lower_flags and any(w in obj_name for w in ["dead", "slain", "remains", "corpse"])) or
                             any(w in obj_name for w in ["dead ", "slain ", "remains of", "dead_"]))
                if not is_corpse:
                    continue
            else:
                required_flags = [f.strip().lower() for f in flag_filter.split(",") if f.strip()]
                if not any(f in lower_flags for f in required_flags):
                    continue

        filtered.append(obj)

    total = len(filtered)
    # Se limit <= 0 ou limit >= 1000, retorna tudo
    if limit <= 0:
        paginated = filtered
    else:
        start_idx = (page - 1) * limit
        end_idx = start_idx + limit
        paginated = filtered[start_idx:end_idx]

    return jsonify({
        "total": total,
        "page": page,
        "limit": limit,
        "pages": (total + limit - 1) // limit if limit > 0 else 1,
        "items": paginated
    })

@app.route("/api/objects/<int:type_id>", methods=["GET"])
def get_object(type_id: int):
    obj = objects_parser.objects.get(type_id)
    if not obj:
        return jsonify({"error": "Object not found"}), 404
    return jsonify({
        "type_id": obj.type_id,
        "name": obj.name,
        "description": obj.description,
        "flags": obj.flags,
        "attributes": obj.attributes,
        "comment": obj.comment
    })

@app.route("/api/objects/save", methods=["POST"])
def save_object():
    data = request.json or {}
    type_id = int(data.get("type_id", -1))
    if type_id < 0:
        return jsonify({"error": "Invalid TypeID"}), 400

    obj = ServerObject(
        type_id=type_id,
        name=data.get("name", ""),
        description=data.get("description", ""),
        flags=data.get("flags", []),
        attributes=data.get("attributes", {}),
        comment=data.get("comment", "")
    )

    objects_parser.objects[type_id] = obj

    if objects_parser.file_path:
        backup_mgr.create_backup(objects_parser.file_path)
        objects_parser.save()

    return jsonify({"success": True, "type_id": type_id, "message": f"Item {type_id} saved successfully!"})

@app.route("/api/objects/delete", methods=["POST"])
def delete_object():
    data = request.json or {}
    type_id = int(data.get("type_id", -1))
    if type_id in objects_parser.objects:
        del objects_parser.objects[type_id]
        if objects_parser.file_path:
            backup_mgr.create_backup(objects_parser.file_path)
            objects_parser.save()
        return jsonify({"success": True, "message": f"Item {type_id} deleted."})
    return jsonify({"error": "Item not found"}), 404

# ----------------- MONSTROS (.MON) -----------------

@app.route("/api/monsters", methods=["GET"])
def get_monsters():
    query = request.args.get("q", "").lower().strip()
    all_monsters = monster_manager.get_all_list()

    filtered = []
    for m in all_monsters:
        if query:
            match_name = query in m["name"].lower()
            match_file = query in m["filename"].lower()
            match_race = str(m["race_number"]).startswith(query)
            if not (match_name or match_file or match_race):
                continue
        filtered.append(m)

    return jsonify({
        "total": len(filtered),
        "monsters": filtered
    })

@app.route("/api/monsters/<filename>", methods=["GET"])
def get_monster(filename: str):
    m = monster_manager.monsters.get(filename)
    if not m:
        return jsonify({"error": "Monster not found"}), 404
    return jsonify({
        "filename": m.filename,
        "name": m.name,
        "article": m.article,
        "race_number": m.race_number,
        "outfit_type": m.outfit_type,
        "outfit_colors": m.outfit_colors,
        "corpse": m.corpse,
        "blood": m.blood,
        "experience": m.experience,
        "summon_cost": m.summon_cost,
        "flee_threshold": m.flee_threshold,
        "attack": m.attack,
        "defend": m.defend,
        "armor": m.armor,
        "poison": m.poison,
        "lose_target": m.lose_target,
        "strategy": m.strategy,
        "hitpoints": m.hitpoints,
        "speed": m.speed,
        "flags": m.flags,
        "skills_raw": m.skills_raw,
        "spells_raw": m.spells_raw,
        "talk": m.talk,
        "inventory": [
            {
                "item_id": it.item_id,
                "count": it.count,
                "chance": it.chance,
                "percentage": it.percentage
            }
            for it in m.inventory
        ]
    })

@app.route("/api/monsters/save", methods=["POST"])
def save_monster():
    data = request.json or {}
    filename = data.get("filename", "").strip()
    if not filename:
        return jsonify({"error": "Invalid filename"}), 400

    if not filename.endswith(".mon"):
        filename += ".mon"

    inv_list = []
    for item in data.get("inventory", []):
        inv_list.append(LootItem(
            item_id=int(item.get("item_id", 0)),
            count=int(item.get("count", 1)),
            chance=int(item.get("chance", 1000))
        ))

    mon = MonsterData(
        filename=filename,
        race_number=int(data.get("race_number", 0)),
        name=data.get("name", ""),
        article=data.get("article", "a"),
        outfit_type=int(data.get("outfit_type", 0)),
        outfit_colors=data.get("outfit_colors", "0-0-0-0"),
        corpse=int(data.get("corpse", 0)),
        blood=data.get("blood", "Blood"),
        experience=int(data.get("experience", 0)),
        summon_cost=int(data.get("summon_cost", 0)),
        flee_threshold=int(data.get("flee_threshold", 0)),
        attack=int(data.get("attack", 0)),
        defend=int(data.get("defend", 0)),
        armor=int(data.get("armor", 0)),
        poison=int(data.get("poison", 0)),
        lose_target=int(data.get("lose_target", 0)),
        strategy=data.get("strategy", "(100, 0, 0, 0)"),
        hitpoints=int(data.get("hitpoints", 100)),
        speed=int(data.get("speed", 100)),
        flags=data.get("flags", []),
        skills_raw=data.get("skills_raw", []),
        spells_raw=data.get("spells_raw", []),
        inventory=inv_list,
        talk=data.get("talk", [])
    )

    if monster_manager.mon_dir:
        full_p = os.path.join(monster_manager.mon_dir, filename)
        backup_mgr.create_backup(full_p)
        monster_manager.save_monster(mon)

    return jsonify({"success": True, "filename": filename, "message": f"Monster {mon.name} saved successfully!"})

# ----------------- MOVEUSE (MOVEUSE.DAT) -----------------

@app.route("/api/moveuse", methods=["GET"])
def get_moveuse():
    query = request.args.get("q", "").lower().strip()
    summary = moveuse_parser.get_summary()

    if query:
        filtered_summary = []
        for sec in summary:
            matched_rules = [
                r for r in sec["rules"]
                if query in r["raw"].lower() or query in str(r["item_ids"])
            ]
            if matched_rules:
                filtered_summary.append({
                    "name": sec["name"],
                    "count": len(matched_rules),
                    "rules": matched_rules
                })
        return jsonify({"sections": filtered_summary})

    return jsonify({"sections": summary})

@app.route("/api/moveuse/save", methods=["POST"])
def save_moveuse():
    data = request.json or {}
    sections_data = data.get("sections", [])

    new_sections = []
    rule_id_seq = 1

    for s in sections_data:
        sec = MoveUseSection(name=s.get("name", "Geral"))
        for r in s.get("rules", []):
            raw = r.get("raw") or f"{r.get('trigger', 'Use')}, {r.get('conditions', '')} -> {r.get('actions', '')}"
            rule_obj = MoveUseRule.from_line(rule_id_seq, sec.name, raw)
            sec.rules.append(rule_obj)
            rule_id_seq += 1
        new_sections.append(sec)

    moveuse_parser.sections = new_sections

    if moveuse_parser.file_path:
        backup_mgr.create_backup(moveuse_parser.file_path)
        moveuse_parser.save()

    return jsonify({"success": True, "message": "File moveuse.dat saved successfully!"})

@app.route("/api/moveuse/docs", methods=["GET"])
def get_moveuse_docs():
    return jsonify(get_full_catalog("en"))

# ----------------- NPCS (.NPC) -----------------

@app.route("/api/npcs", methods=["GET"])
def get_npcs():
    query = request.args.get("q", "").lower().strip()
    all_npcs = npc_manager.get_all_list()

    filtered = []
    for n in all_npcs:
        if query:
            match_name = query in n["name"].lower()
            match_file = query in n["filename"].lower()
            if not (match_name or match_file):
                continue
        filtered.append(n)

    return jsonify({
        "total": len(filtered),
        "npcs": filtered
    })

@app.route("/api/npcs/<filename>", methods=["GET"])
def get_npc(filename: str):
    npc = npc_manager.npcs.get(filename)
    if not npc:
        return jsonify({"error": "NPC not found"}), 404
    return jsonify({
        "filename": npc.filename,
        "name": npc.name,
        "sex": npc.sex,
        "race": npc.race,
        "outfit_type": npc.outfit_type,
        "outfit_colors": npc.outfit_colors,
        "home_pos": npc.home_pos,
        "radius": npc.radius,
        "go_strength": npc.go_strength,
        "behaviour_lines": npc.behaviour_lines
    })

@app.route("/api/npcs/save", methods=["POST"])
def save_npc():
    data = request.json or {}
    filename = data.get("filename", "").strip()
    if not filename:
        return jsonify({"error": "Invalid filename"}), 400

    if not filename.endswith(".npc"):
        filename += ".npc"

    npc = NpcData(
        filename=filename,
        name=data.get("name", ""),
        sex=data.get("sex", "male"),
        race=int(data.get("race", 1)),
        outfit_type=int(data.get("outfit_type", 128)),
        outfit_colors=data.get("outfit_colors", "0-0-0-0"),
        home_pos=data.get("home_pos", "[32000,32000,7]"),
        radius=int(data.get("radius", 2)),
        go_strength=int(data.get("go_strength", 10)),
        behaviour_lines=data.get("behaviour_lines", [])
    )

    if npc_manager.npc_dir:
        full_p = os.path.join(npc_manager.npc_dir, filename)
        backup_mgr.create_backup(full_p)
        npc_manager.save_npc(npc)

    return jsonify({"success": True, "filename": filename, "message": f"NPC {npc.name} saved successfully!"})

# ----------------- INNOVATIVE FEATURES: SIMULATORS & BACKUPS -----------------

@app.route("/api/npcs/simulate_chat", methods=["POST"])
def simulate_npc_chat():
    """Simulates real-time dialogue interaction between a player and an NPC"""
    data = request.json or {}
    filename = data.get("filename", "")
    message = data.get("message", "").strip().lower()
    player_name = data.get("player_name", "Player").strip()
    topic = int(data.get("topic", 0))
    player_money = int(data.get("player_money", 1000))

    npc = npc_manager.npcs.get(filename)
    if not npc:
        for k, v in npc_manager.npcs.items():
            if k.lower() == filename.lower():
                npc = v
                break
    if not npc:
        return jsonify({"error": "NPC not found"}), 404

    response_text = ""
    new_topic = topic
    new_money = player_money
    item_created = None
    item_amount = 0
    item_price = 0

    is_greeting = any(g in message for g in ["hi", "hello", "hey", "ola", "oi", "greetings"])
    is_farewell = any(f in message for f in ["bye", "farewell", "adeus", "tchau"])

    # Scans NPC behaviour lines looking for best match
    matched = False
    for line in npc.behaviour_lines:
        line_clean = line.strip()
        if not line_clean or line_clean.startswith("#") or "->" not in line_clean:
            continue

        trigger_part, action_part = line_clean.split("->", 1)
        trigger_part = trigger_part.strip()
        action_part = action_part.strip()

        # Checks greeting (ADDRESS)
        if "address" in trigger_part.lower():
            if is_greeting and ("hello" in trigger_part.lower() or "hi" in trigger_part.lower() or "! ->" in line_clean):
                matched = True
            else:
                continue

        # Checks condition Topic
        req_topic = None
        topic_match = re.search(r"topic\s*=\s*(\d+)", trigger_part, re.IGNORECASE)
        if topic_match:
            req_topic = int(topic_match.group(1))
            if req_topic != topic:
                continue

        # Verifica palavras-chave entre aspas no trigger
        keywords = re.findall(r'"([^"]+)"', trigger_part)
        keyword_matched = False
        if keywords:
            for kw in keywords:
                clean_kw = kw.strip().rstrip("$").lower()
                if clean_kw in message:
                    keyword_matched = True
                    break
        elif "address" in trigger_part.lower():
            keyword_matched = is_greeting
        else:
            keyword_matched = True

        if not keyword_matched and not (is_greeting and "address" in trigger_part.lower()):
            continue

        # Checks money condition: CountMoney>=Price
        if "countmoney" in trigger_part.lower() and "price" in trigger_part.lower():
            # Needs to know price from previous topic if present
            cur_price = int(data.get("last_price", 0))
            if player_money < cur_price:
                continue

        # Executes actions
        matched = True

        # Price and item type defined in action
        price_m = re.search(r"price\s*=\s*([0-9\*\+]+)", action_part, re.IGNORECASE)
        if price_m:
            try:
                item_price = eval(price_m.group(1)) # Ex: 3 ou 3*1
            except:
                item_price = 10

        amt_m = re.search(r"amount\s*=\s*(\d+)", action_part, re.IGNORECASE)
        if amt_m:
            item_amount = int(amt_m.group(1))

        type_m = re.search(r"type\s*=\s*(\d+)", action_part, re.IGNORECASE)
        if type_m:
            item_created = int(type_m.group(1))

        # Topic update in action
        act_topic = re.search(r"topic\s*=\s*(\d+)", action_part, re.IGNORECASE)
        if act_topic:
            new_topic = int(act_topic.group(1))
        elif "idle" in action_part.lower():
            new_topic = 0

        # Purchase/money deduction
        if "deletemoney" in action_part.lower():
            cur_price = int(data.get("last_price", 0)) or item_price
            if new_money >= cur_price:
                new_money -= cur_price

        # Extrai o texto da fala do NPC
        speech_m = re.findall(r'"([^"]+)"', action_part)
        if speech_m:
            raw_speech = speech_m[0]
            # Substitui tokens do Tibia
            raw_speech = raw_speech.replace("%N", player_name)
            raw_speech = raw_speech.replace("%P", str(item_price or data.get("last_price", 0)))
            raw_speech = raw_speech.replace("%A", str(item_amount or 1))
            response_text = raw_speech
            break

    if not matched:
        if is_farewell:
            response_text = "Good bye."
            new_topic = 0
        else:
            response_text = "I don't understand what you mean."

    return jsonify({
        "success": True,
        "npc_name": npc.name,
        "message": response_text,
        "new_topic": new_topic,
        "new_money": new_money,
        "item_price": item_price,
        "item_created": item_created,
        "item_amount": item_amount
    })

@app.route("/api/monsters/simulate_loot", methods=["POST"])
def simulate_monster_loot():
    """Simula Monte Carlo de drops de loot com base na probabilidade real do monstro"""
    try:
        data = request.json or {}
        filename = data.get("filename", "")
        kills = int(data.get("kills", 100))
        kills = max(1, min(100000, kills))

        mon = monster_manager.monsters.get(filename)
        if not mon:
            for k, v in monster_manager.monsters.items():
                if k.lower() == filename.lower():
                    mon = v
                    break
        if not mon:
            return jsonify({"error": "Monster not found"}), 404

        inventory = mon.inventory
        results = {}
        total_gold = 0
        total_drops = 0

        for item in inventory:
            type_id = getattr(item, "item_id", getattr(item, "type_id", 0))
            max_count = max(1, item.count)
            chance = item.chance # permille: 1 a 1000

            item_drops = 0
            times_dropped = 0

            for _ in range(kills):
                if random.randint(1, 1000) <= chance:
                    times_dropped += 1
                    qty = random.randint(1, max_count)
                    item_drops += qty

            if times_dropped > 0:
                obj_name = f"Item #{type_id}"
                obj_price = 0
                if objects_parser.is_loaded and type_id in objects_parser.objects:
                    obj = objects_parser.objects[type_id]
                    obj_name = obj.name or obj_name
                    obj_price = int(obj.attributes.get("Price", 0) or 0)

                # Se for gold coin (2148 / 3031) ou platinum (2152 / 3035) ou crystal (2160 / 3043)
                val_factor = 1
                if type_id in (2148, 3031): val_factor = 1
                elif type_id in (2152, 3035): val_factor = 100
                elif type_id in (2160, 3043): val_factor = 10000
                else: val_factor = obj_price or 0

                est_gold = item_drops * val_factor
                total_gold += est_gold
                total_drops += item_drops

                if type_id in results:
                    results[type_id]["total_dropped"] += item_drops
                    results[type_id]["times_dropped"] += times_dropped
                    results[type_id]["estimated_gold_value"] += est_gold
                    results[type_id]["actual_chance_pct"] = round((results[type_id]["times_dropped"] / kills) * 100, 2)
                else:
                    results[type_id] = {
                        "type_id": type_id,
                        "name": obj_name,
                        "theory_chance_pct": round((chance / 1000.0) * 100, 2),
                        "actual_chance_pct": round((times_dropped / kills) * 100, 2),
                        "total_dropped": item_drops,
                        "times_dropped": times_dropped,
                        "estimated_gold_value": est_gold,
                        "rarity": "common" if chance >= 200 else ("uncommon" if chance >= 50 else ("rare" if chance >= 5 else "very_rare"))
                    }

        sorted_items = sorted(results.values(), key=lambda x: x["times_dropped"], reverse=True)

        return jsonify({
            "success": True,
            "monster_name": mon.name,
            "kills": kills,
            "total_items_dropped": total_drops,
            "total_gold_value": total_gold,
            "items": sorted_items
        })
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e), "traceback": traceback.format_exc()}), 500

@app.route("/api/backups", methods=["GET"])
def get_backups():
    """Returns history of backups automatically generated by editor"""
    data_path = current_config.get("data_path", "")
    backups = backup_mgr.list_backups([data_path])
    return jsonify({
        "total": len(backups),
        "backups": backups
    })

@app.route("/api/backups/restore", methods=["POST"])
def restore_backup():
    """Restores a user-selected backup"""
    data = request.json or {}
    backup_path = data.get("backup_path", "")
    if not backup_path or not os.path.exists(backup_path):
        return jsonify({"error": "Invalid or missing backup file"}), 400

    ok = backup_mgr.restore_backup(backup_path)
    if ok:
        # Reload server data
        auto_load_data()
        return jsonify({"success": True, "message": "Backup restored successfully!"})
    return jsonify({"error": "Failed to restore backup"}), 500

# =============================================================================
# APIS DE MAPA, TILES, SPAWNS E CASAS
# =============================================================================

@app.route("/api/map/overview", methods=["GET"])
def get_map_overview():
    return jsonify(map_manager.get_overview_info())

@app.route("/api/map/chunk", methods=["GET"])
def get_map_chunk():
    cx = int(request.args.get("x", 32360))
    cy = int(request.args.get("y", 32199))
    z = int(request.args.get("z", 7))
    radius = min(32, max(4, int(request.args.get("radius", 16))))
    chunk = map_manager.get_chunk(cx, cy, z, radius)
    return jsonify(chunk)

@app.route("/api/map/spawns", methods=["GET"])
def get_map_spawns():
    z = int(request.args.get("z", 7))
    min_x = request.args.get("min_x", type=int)
    max_x = request.args.get("max_x", type=int)
    min_y = request.args.get("min_y", type=int)
    max_y = request.args.get("max_y", type=int)
    q = request.args.get("q", "")
    spawns = map_manager.get_spawns_in_area(z=z, min_x=min_x, max_x=max_x, min_y=min_y, max_y=max_y, query=q)
    return jsonify({"spawns": spawns, "total": len(spawns)})

@app.route("/api/map/npcs", methods=["GET"])
def get_map_npcs():
    z = int(request.args.get("z", 7))
    q = request.args.get("q", "").lower().strip()
    results = []
    for n in npc_manager.get_all_list():
        m = re.match(r"\[\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\]", n.get("home_pos", ""))
        if m:
            nx, ny, nz = int(m.group(1)), int(m.group(2)), int(m.group(3))
            if nz == z:
                if not q or (q in n["name"].lower() or q in n["filename"].lower()):
                    results.append({
                        "name": n["name"],
                        "filename": n["filename"],
                        "x": nx,
                        "y": ny,
                        "z": nz,
                        "radius": n.get("radius", 2),
                        "outfit_type": n.get("outfit_type", 128),
                        "outfit_colors": n.get("outfit_colors", "0-0-0-0"),
                        "is_item_outfit": n.get("is_item_outfit", False),
                        "item_outfit_id": n.get("item_outfit_id", 0)
                    })
    return jsonify({"npcs": results, "total": len(results)})

@app.route("/api/map/houses", methods=["GET"])
def get_map_houses():
    z = int(request.args.get("z", 7))
    min_x = request.args.get("min_x", type=int)
    max_x = request.args.get("max_x", type=int)
    min_y = request.args.get("min_y", type=int)
    max_y = request.args.get("max_y", type=int)
    q = request.args.get("q", "")
    houses = map_manager.get_houses_in_area(z=z, min_x=min_x, max_x=max_x, min_y=min_y, max_y=max_y, query=q)
    return jsonify({"houses": houses, "total": len(houses)})

@app.route("/api/map/signs", methods=["GET"])
def get_map_signs():
    z = int(request.args.get("z", 7))
    min_x = request.args.get("min_x", type=int)
    max_x = request.args.get("max_x", type=int)
    min_y = request.args.get("min_y", type=int)
    max_y = request.args.get("max_y", type=int)
    signs = map_manager.get_signs_in_area(z=z, min_x=min_x, max_x=max_x, min_y=min_y, max_y=max_y)
    return jsonify({"signs": signs, "total": len(signs)})

@app.route("/api/map/sector_image/<int:sx>/<int:sy>/<int:sz>", methods=["GET"])
def get_map_sector_image(sx: int, sy: int, sz: int):
    scale = int(request.args.get("scale", 32))
    scale = max(8, min(32, scale))
    cache_dir = os.path.join(BASE_DIR, "cache", "map_sectors")
    png_bytes = map_manager.render_sector_image(sx, sy, sz, dat_reader, spr_reader, scale=scale, cache_dir=cache_dir, objects_parser=objects_parser)
    if png_bytes:
        resp = send_file(BytesIO(png_bytes), mimetype="image/png")
        resp.headers["Cache-Control"] = "no-cache, must-revalidate"
        return resp
    return jsonify({"error": "Sector not found or empty"}), 404

# =============================================================================
# CHANGES COMPARATOR API (DIFF VIEWER BEFORE SAVE)
# =============================================================================

@app.route("/api/diff", methods=["POST"])
def get_file_diff():
    data = request.json or {}
    file_type = data.get("file_type", "")
    filename = data.get("filename", "")
    modified_text = data.get("modified_text", "")

    # If moveuse and no raw text provided, serialize sections
    if file_type == "moveuse" and not modified_text and "sections" in data:
        lines = []
        if moveuse_parser.header_comments:
            lines.extend(moveuse_parser.header_comments)
            lines.append("")
        else:
            lines.append("# Tibia - graphical Multi-User-Dungeon")
            lines.append("# Move/Use Rules File")
            lines.append("")
        for s in data["sections"]:
            sec_name = s.get("name", "Geral")
            if sec_name == "Global":
                for r in s.get("rules", []):
                    raw = r.get("raw") if isinstance(r, dict) else str(r)
                    lines.append(raw)
                lines.append("")
            else:
                lines.append(f'BEGIN "{sec_name}"')
                for r in s.get("rules", []):
                    raw = r.get("raw") if isinstance(r, dict) else str(r)
                    lines.append(raw)
                lines.append("END")
                lines.append("")
        modified_text = "\n".join(lines)

    # If monster and no raw text provided, serialize monster
    if file_type == "monster" and not modified_text and "monster" in data:
        mdata = data["monster"]
        inv_list = []
        for item in mdata.get("inventory", []):
            inv_list.append(LootItem(
                item_id=int(item.get("item_id", 0)),
                count=int(item.get("count", 1)),
                chance=int(item.get("chance", 1000))
            ))
        mon = MonsterData(
            filename=filename or mdata.get("filename", "monster.mon"),
            race_number=int(mdata.get("race_number", 0)),
            name=mdata.get("name", ""),
            article=mdata.get("article", "a"),
            outfit_type=int(mdata.get("outfit_type", 0)),
            outfit_colors=mdata.get("outfit_colors", "0-0-0-0"),
            corpse=int(mdata.get("corpse", 0)),
            blood=mdata.get("blood", "Blood"),
            experience=int(mdata.get("experience", 0)),
            summon_cost=int(mdata.get("summon_cost", 0)),
            flee_threshold=int(mdata.get("flee_threshold", 0)),
            attack=int(mdata.get("attack", 0)),
            defend=int(mdata.get("defend", 0)),
            armor=int(mdata.get("armor", 0)),
            poison=int(mdata.get("poison", 0)),
            lose_target=int(mdata.get("lose_target", 0)),
            strategy=mdata.get("strategy", "(100, 0, 0, 0)"),
            hitpoints=int(mdata.get("hitpoints", 100)),
            speed=int(mdata.get("speed", 100)),
            flags=mdata.get("flags", []),
            skills_raw=mdata.get("skills_raw", []),
            spells_raw=mdata.get("spells_raw", []),
            inventory=inv_list,
            talk=mdata.get("talk", [])
        )
        modified_text = mon.to_mon_text()

    original_text = ""
    data_path = current_config.get("data_path", "")

    try:
        if file_type == "monster" and filename:
            path = os.path.join(data_path, "mon", filename)
            if os.path.exists(path):
                with open(path, "r", encoding="latin-1") as f:
                    original_text = f.read()
        elif file_type == "npc" and filename:
            path = os.path.join(data_path, "npc", filename)
            if os.path.exists(path):
                with open(path, "r", encoding="latin-1") as f:
                    original_text = f.read()
        elif file_type == "moveuse":
            path = os.path.join(data_path, "dat", "moveuse.dat")
            if os.path.exists(path):
                with open(path, "r", encoding="latin-1") as f:
                    original_text = f.read()
        elif file_type == "objects":
            path = os.path.join(data_path, "dat", "objects.srv")
            if os.path.exists(path):
                with open(path, "r", encoding="latin-1") as f:
                    original_text = f.read()

        orig_lines = original_text.splitlines()
        mod_lines = modified_text.splitlines()

        diff_gen = difflib.unified_diff(
            orig_lines, mod_lines,
            fromfile=f"a/{filename or file_type}",
            tofile=f"b/{filename or file_type}",
            lineterm=""
        )
        diff_lines = list(diff_gen)
        
        added_count = sum(1 for l in diff_lines if l.startswith("+") and not l.startswith("+++"))
        removed_count = sum(1 for l in diff_lines if l.startswith("-") and not l.startswith("---"))

        return jsonify({
            "has_diff": len(diff_lines) > 0,
            "filename": filename or file_type,
            "added_count": added_count,
            "removed_count": removed_count,
            "diff_lines": diff_lines,
            "original_lines_count": len(orig_lines),
            "modified_lines_count": len(mod_lines)
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    auto_load_data()
    port = int(os.environ.get("PORT", 8080))
    print(f"=======================================================")
    print(f"   TIBIA DATA STUDIO - INICIANDO SERVIDOR")
    print(f"   Acesse no seu navegador: http://localhost:{port}")
    print(f"=======================================================")
    app.run(host="0.0.0.0", port=port, debug=False)
