"""
Backup and Data Safety Manager
Creates timestamped copies before write operations, lists history, and safely restores backups.
"""

import os
import shutil
from datetime import datetime
from typing import List, Dict, Any

class BackupManager:
    def __init__(self, backup_root: str = None):
        self.backup_root = backup_root

    def create_backup(self, original_file_path: str) -> str:
        """Creates a safe copy of the file before overwriting it"""
        if not os.path.exists(original_file_path):
            return ""

        file_dir = os.path.dirname(os.path.abspath(original_file_path))
        file_name = os.path.basename(original_file_path)
        
        backup_dir = os.path.join(file_dir, ".backups")
        os.makedirs(backup_dir, exist_ok=True)

        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        backup_filename = f"{file_name}.{timestamp}.bak"
        backup_path = os.path.join(backup_dir, backup_filename)

        shutil.copy2(original_file_path, backup_path)
        return backup_path

    def list_backups(self, base_dirs: List[str] = None) -> List[Dict[str, Any]]:
        """Lists all existing backups across the provided base directories"""
        backups = []
        dirs_to_check = base_dirs or []
        if self.backup_root and self.backup_root not in dirs_to_check:
            dirs_to_check.append(self.backup_root)

        for b_dir in dirs_to_check:
            if not os.path.exists(b_dir):
                continue
            for root, dirs, files in os.walk(b_dir):
                if os.path.basename(root) == ".backups":
                    for f in files:
                        if f.endswith(".bak"):
                            full_path = os.path.join(root, f)
                            stat = os.stat(full_path)
                            parent_dir = os.path.dirname(root)
                            # Extract original file name (e.g. dragon.mon.20261013_093000.bak -> dragon.mon)
                            parts = f.split(".")
                            original_name = ".".join(parts[:-2]) if len(parts) >= 3 else parts[0]
                            target_file_path = os.path.join(parent_dir, original_name)

                            backups.append({
                                "filename": f,
                                "path": full_path,
                                "original_name": original_name,
                                "target_file_path": target_file_path,
                                "size_bytes": stat.st_size,
                                "modified_time": datetime.fromtimestamp(stat.st_mtime).strftime("%Y-%m-%d %H:%M:%S"),
                                "category": os.path.basename(parent_dir)
                            })

        # Sort newest first
        backups.sort(key=lambda x: x["modified_time"], reverse=True)
        return backups

    def restore_backup(self, backup_path: str) -> bool:
        """Restores a backup file to its original location, creating a safety backup of current state first"""
        if not os.path.exists(backup_path) or not backup_path.endswith(".bak"):
            return False

        backup_dir = os.path.dirname(backup_path)
        parent_dir = os.path.dirname(backup_dir)
        filename = os.path.basename(backup_path)

        parts = filename.split(".")
        original_name = ".".join(parts[:-2]) if len(parts) >= 3 else parts[0]
        destination = os.path.join(parent_dir, original_name)

        # If destination exists, create backup before overwriting
        if os.path.exists(destination):
            self.create_backup(destination)

        shutil.copy2(backup_path, destination)
        return True
