"""
Map Manager and Map Parser (.sec, monster.db, houses.dat, NPC Homes) (CipSoft / OTServ)
Allows indexing map sectors, rendering tile chunks, listing monster spawns and houses.
"""

import os
import re
from dataclasses import dataclass, field
from typing import List, Dict, Any, Optional, Tuple

# Classic Tibia 7.72 cities and points of interest
TIBIA_CITIES = [
    {"name": "Thais", "x": 32360, "y": 32199, "z": 7, "desc": "Capital of the Kingdom of Tibia"},
    {"name": "Carlin", "x": 32360, "y": 31782, "z": 7, "desc": "City ruled by Queen Eloise"},
    {"name": "Venore", "x": 32957, "y": 32076, "z": 7, "desc": "City of swamplands and merchants"},
    {"name": "Kazordoon", "x": 32649, "y": 31925, "z": 8, "desc": "Underground city of the dwarves"},
    {"name": "Ab'Dendriel", "x": 32679, "y": 31666, "z": 7, "desc": "Forest city of the elves"},
    {"name": "Edron", "x": 33170, "y": 31810, "z": 7, "desc": "Magical island of knights and sorcerers"},
    {"name": "Darashia", "x": 33232, "y": 32454, "z": 7, "desc": "Desert oasis of Darama"},
    {"name": "Ankrahmun", "x": 33194, "y": 32853, "z": 7, "desc": "City of pyramids and pharaohs"},
    {"name": "Port Hope", "x": 32623, "y": 32743, "z": 7, "desc": "Outpost in the heart of Tiquanda jungle"},
    {"name": "Liberty Bay", "x": 32317, "y": 32826, "z": 7, "desc": "Coastal city of the Vandura islands"},
    {"name": "Rookgaard", "x": 32097, "y": 32205, "z": 7, "desc": "Isle of Destiny and novice adventurers"}
]

# Basic classic Tibia minimap colors
DEFAULT_MINIMAP_PALETTE = {
    0: "#000000",       # Void / Unexplored
    100: "#184918",     # Grass
    103: "#246124",     # Common grass
    4600: "#0d3b66",    # Water
    4601: "#10477a",    # Ocean water
    4602: "#15548e",    # Shallow water
    870: "#706d64",     # Thais cobblestone
    429: "#7b776c",     # Stone floor
    1270: "#3d3b37",    # Stone wall
    2360: "#45433d",    # Wall
    102: "#8a5d3b",     # Dirt / Mountain
    231: "#d4a373",     # Sand
    1631: "#b08968"     # Wood / Door
}

@dataclass
class MonsterSpawn:
    race: int
    name: str = ""
    look_type: int = 0
    look_colors: str = "0-0-0-0"
    corpse: int = 0
    is_item_outfit: bool = False
    x: int = 0
    y: int = 0
    z: int = 7
    radius: int = 10
    amount: int = 1
    regen: int = 600

@dataclass
class HouseInfo:
    id: int
    name: str
    description: str = ""
    rent: int = 0
    area_id: int = 0
    is_guildhouse: bool = False
    center: Tuple[int, int, int] = (0, 0, 7)
    exit: Optional[Tuple[int, int, int]] = None

class MapManager:
    def __init__(self, data_path: str = None):
        self.data_path = data_path
        self.map_dir = None
        self.sector_files: Dict[Tuple[int, int, int], str] = {}
        self.sector_cache: Dict[Tuple[int, int, int], Dict[Tuple[int, int], List[int]]] = {}
        self.sector_signs_cache: Dict[Tuple[int, int, int], List[Dict[str, Any]]] = {}
        self.spawns: List[MonsterSpawn] = []
        self.houses: List[HouseInfo] = []
        self.is_loaded = False
        
        self.min_sec_x = 9999
        self.max_sec_x = 0
        self.min_sec_y = 9999
        self.max_sec_y = 0

        if data_path:
            self.load_all(data_path)

    def load_all(self, data_path: str):
        self.data_path = data_path
        self.map_dir = os.path.join(data_path, "map")
        self.sector_files.clear()
        self.sector_cache.clear()
        self.sector_signs_cache.clear()
        self.spawns.clear()
        self.houses.clear()

        # 1. Index sector files (.sec)
        if os.path.exists(self.map_dir):
            for fname in os.listdir(self.map_dir):
                if fname.endswith(".sec") and not fname.endswith("~"):
                    m = re.match(r"^(\d+)-(\d+)-(\d+)\.sec$", fname)
                    if m:
                        sx, sy, sz = int(m.group(1)), int(m.group(2)), int(m.group(3))
                        self.sector_files[(sx, sy, sz)] = fname
                        self.min_sec_x = min(self.min_sec_x, sx)
                        self.max_sec_x = max(self.max_sec_x, sx)
                        self.min_sec_y = min(self.min_sec_y, sy)
                        self.max_sec_y = max(self.max_sec_y, sy)

        # 2. Load monster spawns (monster.db)
        mon_db_path = os.path.join(data_path, "dat", "monster.db")
        if os.path.exists(mon_db_path):
            try:
                with open(mon_db_path, "r", encoding="latin-1") as f:
                    for line in f:
                        line = line.strip()
                        if line and not line.startswith("#"):
                            parts = line.split()
                            if len(parts) >= 7 and all(p.isdigit() for p in parts[:7]):
                                self.spawns.append(MonsterSpawn(
                                    race=int(parts[0]),
                                    x=int(parts[1]),
                                    y=int(parts[2]),
                                    z=int(parts[3]),
                                    radius=int(parts[4]),
                                    amount=int(parts[5]),
                                    regen=int(parts[6])
                                ))
            except Exception as e:
                print(f"Error loading monster.db: {e}")

        # 3. Load houses (houses.dat)
        houses_path = os.path.join(data_path, "dat", "houses.dat")
        if os.path.exists(houses_path):
            try:
                with open(houses_path, "r", encoding="latin-1") as f:
                    content = f.read()
                
                blocks = re.split(r'\n\s*\n', content)
                for block in blocks:
                    m_id = re.search(r'ID\s*=\s*(\d+)', block, re.IGNORECASE)
                    m_name = re.search(r'Name\s*=\s*"([^"]+)"', block, re.IGNORECASE)
                    m_desc = re.search(r'Description\s*=\s*"([^"]*)"', block, re.IGNORECASE)
                    m_rent = re.search(r'RentOffset\s*=\s*(\d+)', block, re.IGNORECASE)
                    m_area = re.search(r'Area\s*=\s*(\d+)', block, re.IGNORECASE)
                    m_guild = re.search(r'GuildHouse\s*=\s*(true|false)', block, re.IGNORECASE)
                    m_center = re.search(r'Center\s*=\s*\[(\d+),\s*(\d+),\s*(\d+)\]', block, re.IGNORECASE)
                    m_exit = re.search(r'Exit\s*=\s*\[(\d+),\s*(\d+),\s*(\d+)\]', block, re.IGNORECASE)

                    if m_id and m_name and m_center:
                        self.houses.append(HouseInfo(
                            id=int(m_id.group(1)),
                            name=m_name.group(1),
                            description=m_desc.group(1) if m_desc else "",
                            rent=int(m_rent.group(1)) if m_rent else 0,
                            area_id=int(m_area.group(1)) if m_area else 0,
                            is_guildhouse=(m_guild.group(1).lower() == "true") if m_guild else False,
                            center=(int(m_center.group(1)), int(m_center.group(2)), int(m_center.group(3))),
                            exit=(int(m_exit.group(1)), int(m_exit.group(2)), int(m_exit.group(3))) if m_exit else None
                        ))
            except Exception as e:
                print(f"Error loading houses.dat: {e}")

        self.is_loaded = True
        return True

    def link_monsters(self, monsters_list: List[Dict[str, Any]]):
        """Associates loaded monster names and looktypes with spawn records."""
        race_map = {}
        for m in monsters_list:
            r = m.get("race_number")
            if r is not None:
                race_map[int(r)] = m

        for s in self.spawns:
            if s.race in race_map:
                m = race_map[s.race]
                s.name = m.get("name", f"Monster #{s.race}")
                s.look_type = m.get("outfit_type", 0)
                s.look_colors = m.get("outfit_colors", "0-0-0-0")
                s.corpse = m.get("corpse", 0)
                s.is_item_outfit = (s.look_type == 0 and s.corpse > 0)
            else:
                s.name = f"Race #{s.race}"

    def parse_sector(self, sec_x: int, sec_y: int, sec_z: int) -> Optional[Dict[Tuple[int, int], List[int]]]:
        """Loads and caches the 1024 tiles (32x32) of a .sec sector file."""
        key = (sec_x, sec_y, sec_z)
        if key in self.sector_cache:
            return self.sector_cache[key]

        if key not in self.sector_files or not self.map_dir:
            return None

        fname = self.sector_files[key]
        full_path = os.path.join(self.map_dir, fname)
        if not os.path.exists(full_path):
            return None

        tiles: Dict[Tuple[int, int], List[Any]] = {}
        sector_signs: List[Dict[str, Any]] = []
        try:
            with open(full_path, "r", encoding="latin-1") as f:
                for line in f:
                    m = re.match(r"^(\d+)-(\d+):", line)
                    if not m:
                        continue
                    dx, dy = int(m.group(1)), int(m.group(2))
                    start = line.find("Content={")
                    if start == -1:
                        continue
                    start += 9
                    end = line.rfind("}")
                    if end <= start:
                        continue
                    s = line[start:end]

                    # Safe parse balancing curly braces {} and double quotes ""
                    # Only level 0 items in tile Content are ground items
                    # Any item inside nested Content={...} (chest, shelf, backpack) is ignored
                    depth = 0
                    in_q = False
                    tokens = []
                    cur = []
                    for i, c in enumerate(s):
                        if c == '"' and (i == 0 or s[i-1] != '\\'):
                            in_q = not in_q
                            cur.append(c)
                        elif not in_q:
                            if c == '{':
                                depth += 1
                            elif c == '}':
                                depth -= 1
                            elif c == ',' and depth == 0:
                                tokens.append("".join(cur).strip())
                                cur = []
                                continue
                            if depth == 0:
                                cur.append(c)
                        else:
                            if depth == 0:
                                cur.append(c)
                    if cur:
                        tokens.append("".join(cur).strip())

                    tile_items = []
                    for tok in tokens:
                        if not tok:
                            continue
                        m_id = re.match(r"^(\d+)", tok)
                        if not m_id:
                            continue
                        item_id = int(m_id.group(1))

                        liquid_type = 0
                        m_liq = re.search(r"ContainerLiquidType\s*=\s*(\d+)", tok)
                        if m_liq:
                            liquid_type = int(m_liq.group(1))

                        tile_items.append((item_id, liquid_type))

                    # Extract all text inscriptions (signs, wall plaques, books in bookshelves, scrolls, tombstones)
                    # Support both ground-level items and nested items inside containers (like books inside bookshelves)
                    pattern_inscr = re.compile(r'(\d+)\s+([^,{}]*?String\s*=\s*"([^"]*)")(?:[^,{}]*?Editor\s*=\s*"([^"]*)")?', re.DOTALL)
                    for m in pattern_inscr.finditer(line):
                        item_id = int(m.group(1))
                        text = m.group(3).replace(r'\n', '\n').strip()
                        editor = m.group(4) if m.group(4) else None
                        if text:
                            sector_signs.append({
                                "x": sec_x * 32 + dx,
                                "y": sec_y * 32 + dy,
                                "z": sec_z,
                                "text": text,
                                "editor": editor,
                                "item_id": item_id
                            })

                    tiles[(dx, dy)] = tile_items

            # Cache limit to keep memory usage under control (<150 sectors)
            if len(self.sector_cache) > 150:
                self.sector_cache.pop(next(iter(self.sector_cache)))

            self.sector_cache[key] = tiles
            self.sector_signs_cache[key] = sector_signs
            return tiles
        except Exception as e:
            print(f"Error parsing sector {fname}: {e}")
            return None

    def get_signs_in_area(self, z: int, min_x: int = None, max_x: int = None, min_y: int = None, max_y: int = None) -> List[Dict[str, Any]]:
        """Returns all signs and plaques present in the specified area."""
        if min_x is None:
            min_x = 0
            max_x = 65535
            min_y = 0
            max_y = 65535

        min_sx = min_x // 32
        max_sx = max_x // 32
        min_sy = min_y // 32
        max_sy = max_y // 32

        signs_res = []
        for (sx, sy, sz) in list(self.sector_files.keys()):
            if sz == z and (min_sx <= sx <= max_sx) and (min_sy <= sy <= max_sy):
                self.parse_sector(sx, sy, sz)
                if (sx, sy, sz) in self.sector_signs_cache:
                    for s in self.sector_signs_cache[(sx, sy, sz)]:
                        if min_x <= s["x"] <= max_x and min_y <= s["y"] <= max_y:
                            signs_res.append(s)
        return signs_res

    @staticmethod
    def get_item_render_priority(tt) -> int:
        """
        Calculates official Tibia 7.72 render priority hierarchy:
        0: Base Ground (ground / full_ground)
        1: Ground Borders (clip)
        2: Passable floor overlays (carpets, puddles, walkable bottom decor)
        3: Walls and Wall Windows (unpassable bottom, walls, framework windows)
        4: Furniture surfaces / Elevation bases (elevation > 0 or solid unpassable furniture like tables, counters, desks)
        5: Common floor items and items on tables (candlesticks, torches, bottles, keys, documents, weapons)
        6: Wall hangable items (curtains, mirrors, tapestries, clocks, pictures)
        7: Tall structures that cover creatures (top, archways, high roofs)
        """
        if not tt:
            return 5
        flags = tt.flags
        if "ground" in flags or "full_ground" in flags:
            return 0  # PRIORITY_BANK (base ground)
        if "clip" in flags:
            return 1  # PRIORITY_CLIP (terrain borders)
        if "bottom" in flags:
            # Walls and windows in Tibia.dat have 'bottom': True along with 'unpass': True
            if "unpass" in flags or "unthrow" in flags or "hook_south" in flags or "hook_east" in flags:
                return 3  # Walls and windows
            return 2  # Carpets, passable puddles, walk-over bottom tiles
        if "hangable" in flags:
            return 6  # Curtains, tapestries, wall mirrors, pictures
        if "top" in flags:
            # Open doors render at wall level
            if "unpass" in flags or tt.id in [1630, 1633, 1639, 1641, 1643, 1645, 1652, 1655, 1657, 1659]:
                return 3
            return 7  # Archways, tall roofs
        # Elevation surfaces (tables, desks, counters, chests, altars)
        if flags.get("elevation", 0) > 0 or ("unpass" in flags and not ("take" in flags)):
            return 4
        # Common items placed on floor or on surfaces
        return 5

    def resolve_item_id(self, item_id: int, objects_parser=None) -> int:
        """Resolves visual TypeID if item has Disguise and DisguiseTarget flags."""
        parser = objects_parser or self.objects_parser
        if parser:
            obj = parser.objects.get(item_id)
            if obj and "DisguiseTarget" in obj.attributes:
                try:
                    return int(obj.attributes["DisguiseTarget"])
                except Exception:
                    pass
        return item_id

    def render_sector_image(self, sec_x: int, sec_y: int, sec_z: int, dat_reader, spr_reader, scale: int = 32, cache_dir: str = None, objects_parser=None) -> Optional[bytes]:
        """Renders a 32x32 sector with sharp native sprites (32x32), official CipSoft layer ordering and DisguiseTarget."""
        key = (sec_x, sec_y, sec_z)
        if key not in self.sector_files:
            return None

        cache_file = None
        if cache_dir:
            os.makedirs(cache_dir, exist_ok=True)
            cache_file = os.path.join(cache_dir, f"{sec_z}_{sec_x}_{sec_y}_{scale}.png")
            if os.path.exists(cache_file):
                try:
                    with open(cache_file, "rb") as f:
                        return f.read()
                except Exception:
                    pass

        tiles = self.parse_sector(sec_x, sec_y, sec_z)
        if not tiles:
            return None

        from PIL import Image
        import io

        # Sector background: transparent (water is rendered explicitly by items 870 / 4597-4602)
        # and dark underground. This avoids blue water holes inside mountains and rocks.
        if sec_z > 7:
            bg_color = (12, 15, 23, 255)
        else:
            bg_color = (0, 0, 0, 0)
        img = Image.new("RGBA", (32 * scale, 32 * scale), bg_color)
        sprite_cache = {}

        # Mapping of extra items coming from neighboring sectors (East, South, Southeast)
        # that have width > 1 or height > 1 and overflow into the border (dx=31 or dy=31) of this sector
        extra_boundary_items: Dict[Tuple[int, int], List[Any]] = {}
        for (adj_sx, adj_sy, ox, oy) in [
            (sec_x + 1, sec_y, 32, 0),       # East neighbor (overflows to the left)
            (sec_x, sec_y + 1, 0, 32),       # South neighbor (overflows upwards)
            (sec_x + 1, sec_y + 1, 32, 32),  # Southeast neighbor (overflows diagonally)
        ]:
            if (adj_sx, adj_sy, sec_z) in self.sector_files:
                adj_tiles = self.parse_sector(adj_sx, adj_sy, sec_z)
                if adj_tiles:
                    for (adx, ady), a_items in adj_tiles.items():
                        # Only tiles close to the border (adx <= 2 or ady <= 2) can overlap
                        if (ox > 0 and adx > 2) or (oy > 0 and ady > 2):
                            continue
                        for it in a_items:
                            iid = it[0] if isinstance(it, (tuple, list)) else it
                            draw_iid = self.resolve_item_id(iid, objects_parser)
                            tt_adj = dat_reader.get_item(draw_iid)
                            if tt_adj and (tt_adj.width > 1 or tt_adj.height > 1):
                                # Calculates where anchor would be in local sector space
                                target_dx = adx + ox
                                target_dy = ady + oy
                                pos_key = (target_dx, target_dy)
                                if pos_key not in extra_boundary_items:
                                    extra_boundary_items[pos_key] = []
                                extra_boundary_items[pos_key].append(it)

        for dy in range(32):
            for dx in range(32):
                tile_content = list(tiles.get((dx, dy), []))
                if not tile_content:
                    continue

                # 1. Sort items by official CipSoft hierarchy
                # Strictly preserves .sec stacking order for items of same priority (3)
                sorted_items = sorted(
                    tile_content,
                    key=lambda item_entry: self.get_item_render_priority(
                        dat_reader.get_item(self.resolve_item_id(item_entry[0] if isinstance(item_entry, (tuple, list)) else item_entry, objects_parser))
                    )
                )

                gx = sec_x * 32 + dx
                gy = sec_y * 32 + dy
                px = dx * scale
                py = dy * scale

                for item_entry in sorted_items:
                    if isinstance(item_entry, (tuple, list)):
                        item_id, liquid_type = item_entry[0], item_entry[1]
                    else:
                        item_id, liquid_type = item_entry, 0

                    draw_item_id = self.resolve_item_id(item_id, objects_parser)
                    tt = dat_reader.get_item(draw_item_id)
                    if not tt or not tt.sprites:
                        continue

                    flags = tt.flags
                    # Only ground and borders use pattern repetition by global coordinates
                    if "ground" in flags or "full_ground" in flags or "clip" in flags:
                        pat_x = (gx % tt.pattern_x) if tt.pattern_x > 0 else 0
                        pat_y = (gy % tt.pattern_y) if tt.pattern_y > 0 else 0
                    elif "fluid_container" in flags:
                        if liquid_type > 0 and tt.pattern_x > 0:
                            pat_x = liquid_type % tt.pattern_x
                            pat_y = (liquid_type // tt.pattern_x) % (tt.pattern_y if tt.pattern_y > 0 else 1)
                        else:
                            pat_x = 0
                            pat_y = 0
                    elif "splash" in flags:
                        if liquid_type > 0 and tt.pattern_x > 0:
                            pat_x = liquid_type % tt.pattern_x
                            pat_y = (liquid_type // tt.pattern_x) % (tt.pattern_y if tt.pattern_y > 0 else 1)
                        else:
                            pat_x = 0
                            pat_y = 0
                    elif "hangable" in flags and tt.pattern_x >= 3:
                        # Hangables (tapestries, paintings, mirrors, cuckoo clocks):
                        # pat_x = 0: floor / rolled item
                        # pat_x = 1: hanging on North/East-facing wall (hook_east / horizontal wall)
                        # pat_x = 2: hanging on West/South-facing wall (hook_south / vertical wall)
                        # Check current tile items for a wall with hook_south or hook_east
                        tile_has_south_hook = False
                        tile_has_east_hook = False
                        for other_entry in tile_content:
                            o_id = other_entry[0] if isinstance(other_entry, (tuple, list)) else other_entry
                            o_draw_id = self.resolve_item_id(o_id, objects_parser)
                            o_tt = dat_reader.get_item(o_draw_id)
                            if o_tt:
                                if "hook_south" in o_tt.flags:
                                    tile_has_south_hook = True
                                    break
                                elif "hook_east" in o_tt.flags:
                                    tile_has_east_hook = True
                                    break
                        if tile_has_south_hook:
                            pat_x = 2
                            pat_y = 0
                        elif tile_has_east_hook:
                            pat_x = 1
                            pat_y = 0
                        else:
                            # It is placed on the floor (rolled tapestry, framed item on carpet/floor)
                            pat_x = 0
                            pat_y = 0
                    else:
                        pat_x = 0
                        pat_y = 0

                    shift_x = int(flags.get("shift_x", 0) * (scale / 32))
                    shift_y = int(flags.get("shift_y", 0) * (scale / 32))

                    # Full support for all sprite layers (e.g. door + frame, windows, trees)
                    for l_idx in range(tt.layers):
                        for w_idx in range(tt.width):
                            for h_idx in range(tt.height):
                                spr_id = tt.get_sprite_index(w=w_idx, h=h_idx, l=l_idx, x=pat_x, y=pat_y)
                                if not spr_id:
                                    continue

                                if spr_id not in sprite_cache:
                                    spr_img = spr_reader.get_sprite_image(spr_id)
                                    if spr_img:
                                        if scale != 32:
                                            spr_img = spr_img.resize((scale, scale), Image.NEAREST)
                                        sprite_cache[spr_id] = spr_img
                                    else:
                                        sprite_cache[spr_id] = None

                                s_img = sprite_cache.get(spr_id)
                                if s_img:
                                    draw_x = px - (w_idx * scale) - shift_x
                                    draw_y = py - (h_idx * scale) - shift_y
                                    img.paste(s_img, (draw_x, draw_y), s_img)

        # 2. Draw multi-tile object parts from neighbor sectors that overflow into this sector
        for (target_dx, target_dy), b_items in extra_boundary_items.items():
            for item_entry in b_items:
                iid = item_entry[0] if isinstance(item_entry, (tuple, list)) else item_entry
                draw_iid = self.resolve_item_id(iid, objects_parser)
                tt = dat_reader.get_item(draw_iid)
                if not tt or not tt.sprites:
                    continue
                flags = tt.flags
                shift_x = int(flags.get("shift_x", 0) * (scale / 32))
                shift_y = int(flags.get("shift_y", 0) * (scale / 32))
                px = target_dx * scale
                py = target_dy * scale
                for l_idx in range(tt.layers):
                    for w_idx in range(tt.width):
                        for h_idx in range(tt.height):
                            draw_x = px - (w_idx * scale) - shift_x
                            draw_y = py - (h_idx * scale) - shift_y
                            # Only draws if part falls inside visible bounds of this sector
                            if draw_x + scale <= 0 or draw_x >= 32 * scale or draw_y + scale <= 0 or draw_y >= 32 * scale:
                                continue
                            spr_id = tt.get_sprite_index(w=w_idx, h=h_idx, l=l_idx, x=0, y=0)
                            if not spr_id:
                                continue
                            if spr_id not in sprite_cache:
                                spr_img = spr_reader.get_sprite_image(spr_id)
                                if spr_img:
                                    if scale != 32:
                                        spr_img = spr_img.resize((scale, scale), Image.NEAREST)
                                    sprite_cache[spr_id] = spr_img
                                else:
                                    sprite_cache[spr_id] = None
                            s_img = sprite_cache.get(spr_id)
                            if s_img:
                                img.paste(s_img, (draw_x, draw_y), s_img)

        buf = io.BytesIO()
        img.save(buf, format="PNG", optimize=True)
        png_data = buf.getvalue()

        if cache_file:
            try:
                with open(cache_file, "wb") as f:
                    f.write(png_data)
            except Exception:
                pass

        return png_data

    def get_chunk(self, center_x: int, center_y: int, z: int, radius: int = 16) -> Dict[str, Any]:
        """Returns a cropped tile grid around a central world coordinate."""
        min_x = center_x - radius
        max_x = center_x + radius
        min_y = center_y - radius
        max_y = center_y + radius

        min_sx = min_x // 32
        max_sx = max_x // 32
        min_sy = min_y // 32
        max_sy = max_y // 32

        tiles_result = {}
        for sx in range(min_sx, max_sx + 1):
            for sy in range(min_sy, max_sy + 1):
                sec_tiles = self.parse_sector(sx, sy, z)
                if sec_tiles:
                    base_gx = sx * 32
                    base_gy = sy * 32
                    for (dx, dy), items in sec_tiles.items():
                        gx = base_gx + dx
                        gy = base_gy + dy
                        if min_x <= gx <= max_x and min_y <= gy <= max_y:
                            tiles_result[f"{gx},{gy}"] = [it[0] if isinstance(it, (tuple, list)) else it for it in items]

        return {
            "center_x": center_x,
            "center_y": center_y,
            "z": z,
            "radius": radius,
            "min_x": min_x,
            "max_x": max_x,
            "min_y": min_y,
            "max_y": max_y,
            "tiles": tiles_result
        }

    def get_spawns_in_area(self, z: int, min_x: int = None, max_x: int = None, min_y: int = None, max_y: int = None, query: str = "") -> List[Dict[str, Any]]:
        """Returns monster spawns that exist on the specified Z floor."""
        res = []
        q = query.lower().strip()
        for s in self.spawns:
            if s.z != z:
                continue
            if min_x is not None and (s.x < min_x or s.x > max_x):
                continue
            if min_y is not None and (s.y < min_y or s.y > max_y):
                continue
            if q and q not in s.name.lower() and q not in str(s.race):
                continue

            res.append({
                "race": s.race,
                "name": s.name,
                "look_type": s.look_type,
                "look_colors": s.look_colors,
                "corpse": s.corpse,
                "is_item_outfit": s.is_item_outfit,
                "x": s.x,
                "y": s.y,
                "z": s.z,
                "radius": s.radius,
                "amount": s.amount,
                "regen": s.regen
            })
        return res

    def get_houses_in_area(self, z: int, min_x: int = None, max_x: int = None, min_y: int = None, max_y: int = None, query: str = "") -> List[Dict[str, Any]]:
        """Returns houses on the specified Z floor."""
        res = []
        q = query.lower().strip()
        for h in self.houses:
            cx, cy, cz = h.center
            if cz != z:
                continue
            if min_x is not None and (cx < min_x or cx > max_x):
                continue
            if min_y is not None and (cy < min_y or cy > max_y):
                continue
            if q and q not in h.name.lower() and q not in str(h.id):
                continue

            res.append({
                "id": h.id,
                "name": h.name,
                "description": h.description,
                "rent": h.rent,
                "area_id": h.area_id,
                "is_guildhouse": h.is_guildhouse,
                "center": list(h.center),
                "exit": list(h.exit) if h.exit else None
            })
        return res

    def get_overview_info(self) -> Dict[str, Any]:
        """General map information, bounds and cities."""
        return {
            "total_sectors": len(self.sector_files),
            "total_spawns": len(self.spawns),
            "total_houses": len(self.houses),
            "bounds": {
                "min_sec_x": self.min_sec_x,
                "max_sec_x": self.max_sec_x,
                "min_sec_y": self.min_sec_y,
                "max_sec_y": self.max_sec_y,
                "min_global_x": self.min_sec_x * 32,
                "max_global_x": (self.max_sec_x + 1) * 32,
                "min_global_y": self.min_sec_y * 32,
                "max_global_y": (self.max_sec_y + 1) * 32
            },
            "cities": TIBIA_CITIES
        }
