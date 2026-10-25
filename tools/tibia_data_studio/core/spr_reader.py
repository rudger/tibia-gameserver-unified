"""
Tibia.spr File Parser and Decoder
Supports versions 7.4 / 7.6 / 7.72 / 8.0+
Reads sprite data into memory and decodes 32x32 sprites in RGBA format in a 100% thread-safe manner with LRU cache.
"""

import os
import struct
from io import BytesIO
from functools import lru_cache
from PIL import Image

class SprReader:
    def __init__(self, file_path: str = None):
        self.file_path = file_path
        self.signature = 0
        self.sprite_count = 0
        self.offsets = []
        self._data = None
        self.is_loaded = False
        self.version_type = "16bit"

        if file_path and os.path.exists(file_path):
            self.load(file_path)

    def load(self, file_path: str) -> bool:
        """Reads header, offset table, and Tibia.spr into memory in a thread-safe manner"""
        self.file_path = file_path
        if not os.path.exists(file_path):
            return False

        with open(file_path, "rb") as f:
            self._data = f.read()

        file_size = len(self._data)
        if file_size < 6:
            return False

        # Leitura da assinatura (4 bytes)
        self.signature = struct.unpack_from("<I", self._data, 0)[0]

        # Contagem de sprites (2 bytes no 7.4-7.72, 4 bytes no 8.0+)
        count_16 = struct.unpack_from("<H", self._data, 4)[0]
        expected_size_16 = 6 + (count_16 * 4)

        if expected_size_16 <= file_size:
            self.sprite_count = count_16
            self.version_type = "16bit"
            offset_start = 6
        else:
            count_32 = struct.unpack_from("<I", self._data, 4)[0]
            self.sprite_count = count_32
            self.version_type = "32bit"
            offset_start = 8

        # Reads all offsets (4 bytes each)
        offset_bytes = self._data[offset_start : offset_start + (self.sprite_count * 4)]
        self.offsets = list(struct.unpack(f"<{self.sprite_count}I", offset_bytes))
        self.is_loaded = True
        self.get_sprite_image.cache_clear()
        return True

    def close(self):
        self._data = None
        self.is_loaded = False
        self.get_sprite_image.cache_clear()

    @lru_cache(maxsize=8192)
    def get_sprite_image(self, sprite_id: int) -> Image.Image:
        """
        Retorna uma imagem PIL RGBA de 32x32 para o sprite especificado.
        Sprite IDs are 1-indexed up to sprite_count.
        Thread-safe: Reads directly from memory buffer via slicing without concurrent file seek.
        """
        blank_img = Image.new("RGBA", (32, 32), (0, 0, 0, 0))

        if not self.is_loaded or self._data is None or sprite_id <= 0 or sprite_id > self.sprite_count:
            return blank_img

        offset = self.offsets[sprite_id - 1]
        if offset == 0 or offset + 5 > len(self._data):
            return blank_img

        try:
            # Formato do Tibia.spr:
            # 3 bytes para a cor transparente chave (RGB: R, G, B) em offset..offset+3
            # 2 bytes para o tamanho dos dados RLE comprimidos em offset+3..offset+5
            data_size = struct.unpack_from("<H", self._data, offset + 3)[0]
            if data_size == 0 or offset + 5 + data_size > len(self._data):
                return blank_img

            raw_data = self._data[offset + 5 : offset + 5 + data_size]
            pixels = bytearray(32 * 32 * 4) # 1024 pixels * 4 canais RGBA

            read_pos = 0
            pixel_index = 0

            while read_pos < data_size and pixel_index < 1024:
                # 2 bytes: contagem de pixels transparentes
                # 2 bytes: contagem de pixels coloridos
                trans_count, color_count = struct.unpack_from("<HH", raw_data, read_pos)
                read_pos += 4

                # Advances transparent pixels
                pixel_index += trans_count

                # Reads colored pixels (RGB - 3 bytes per pixel)
                for _ in range(color_count):
                    if pixel_index >= 1024 or read_pos + 3 > data_size:
                        break
                    r = raw_data[read_pos]
                    g = raw_data[read_pos + 1]
                    b = raw_data[read_pos + 2]
                    read_pos += 3

                    base_idx = pixel_index * 4
                    pixels[base_idx] = r
                    pixels[base_idx + 1] = g
                    pixels[base_idx + 2] = b
                    pixels[base_idx + 3] = 255 # Opaco
                    pixel_index += 1

            return Image.frombytes("RGBA", (32, 32), bytes(pixels))

        except Exception as e:
            return blank_img

    def get_sprite_png_bytes(self, sprite_id: int, zoom: int = 1) -> bytes:
        """Retorna os bytes em formato PNG do sprite com zoom opcional"""
        img = self.get_sprite_image(sprite_id)
        if zoom > 1:
            img = img.resize((32 * zoom, 32 * zoom), Image.Resampling.NEAREST)

        buffer = BytesIO()
        img.save(buffer, format="PNG")
        return buffer.getvalue()

