cmake_minimum_required(VERSION 3.15)
project(tibia-server LANGUAGES C CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

include_directories(
    src
    src/compat
    src/crypto
    src/database
    src/login
    src/game
)

file(GLOB_RECURSE SERVER_SOURCES
    src/compat/*.cc
    src/crypto/*.cc
    src/database/*.c
    src/database/*.cc
    src/login/*.cc
    src/game/*.cc
    src/main.cc
)

add_executable(tibia-server ${SERVER_SOURCES})

if(WIN32)
    # Check vcpkg default include & lib paths if present
    if(EXISTS "D:/vcpkg/installed/x64-windows/include")
        target_include_directories(tibia-server PRIVATE
            "D:/vcpkg/installed/x64-windows/include"
        )
        target_link_directories(tibia-server PRIVATE
            "D:/vcpkg/installed/x64-windows/lib"
        )
    elseif(EXISTS "C:/vcpkg/installed/x64-windows/include")
        target_include_directories(tibia-server PRIVATE
            "C:/vcpkg/installed/x64-windows/include"
        )
        target_link_directories(tibia-server PRIVATE
            "C:/vcpkg/installed/x64-windows/lib"
        )
    endif()

    # MySQL/MariaDB is optional: without it the server builds with SQLite only.
    # Point MYSQL_ROOT to a MariaDB Connector/C install to use another location.
    set(MYSQL_ROOT "" CACHE PATH "MariaDB Connector/C or MySQL install directory")
    find_path(MYSQL_INCLUDE_DIR NAMES mysql.h
        PATHS
            "${MYSQL_ROOT}/include"
            "${MYSQL_ROOT}/include/mysql"
            "D:/vcpkg/installed/x64-windows/include/mysql"
            "C:/vcpkg/installed/x64-windows/include/mysql"
            "C:/Program Files/MariaDB/MariaDB Connector C 64-bit/include"
            "C:/Program Files/MariaDB/MariaDB Connector C/include"
        NO_DEFAULT_PATH
    )
    find_library(MYSQL_LIBRARY NAMES libmariadb mariadb libmysql
        PATHS
            "${MYSQL_ROOT}/lib"
            "${MYSQL_ROOT}/lib/mariadb"
            "D:/vcpkg/installed/x64-windows/lib"
            "C:/vcpkg/installed/x64-windows/lib"
            "C:/Program Files/MariaDB/MariaDB Connector C 64-bit/lib"
            "C:/Program Files/MariaDB/MariaDB Connector C/lib"
        NO_DEFAULT_PATH
    )

    target_link_libraries(tibia-server PRIVATE ws2_32 mpir)
    if(MYSQL_INCLUDE_DIR AND MYSQL_LIBRARY)
        message(STATUS "MySQL/MariaDB support: ${MYSQL_INCLUDE_DIR}")
        target_include_directories(tibia-server PRIVATE "${MYSQL_INCLUDE_DIR}")
        target_link_libraries(tibia-server PRIVATE "${MYSQL_LIBRARY}")
    else()
        message(WARNING "MySQL/MariaDB headers or library not found: building with SQLite only (db_type = \"sqlite\").")
        target_compile_definitions(tibia-server PRIVATE TIBIA_NO_MYSQL=1)
    endif()
    target_compile_definitions(tibia-server PRIVATE _CRT_SECURE_NO_WARNINGS WIN32_LEAN_AND_MEAN OS_WINDOWS=1)
else()
    find_package(MySQL QUIET)
    if(MYSQL_FOUND)
        target_include_directories(tibia-server PRIVATE ${MYSQL_INCLUDE_DIR})
        target_link_libraries(tibia-server PRIVATE pthread dl gmp ${MYSQL_CLIENT_LIBS})
    else()
        target_link_libraries(tibia-server PRIVATE pthread dl gmp mariadb)
    endif()
    target_compile_definitions(tibia-server PRIVATE OS_LINUX=1)
endif()
