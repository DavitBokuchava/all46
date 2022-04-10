export const fspv = {
    "gpon": {
        "zte": {
            "frame": 1,
            "slot": [1, 24],// gasarkvevia
            "port": [1, 8], // gasarkvevia 8 an 16
            "vport": [1, 64]
        },
        "huawei": {
            "frame": 0,
            "slot": [0, 24],// gasarkvevia
            "port": [0, 16],
            "vport": [0, 127]
        }
    },
    "dsl": {
        "alcatel": {
            "frame": 1,
            "slot": [1, 128],// gasarkvevia
            "port": [1, 128], // gasarkvevia
        },
        "huawei": {
            "frame": 0,
            "slot": [0, 128], // gasarkvevia
            "port": [0, 128], // gasarkvevia
        }
    }
}