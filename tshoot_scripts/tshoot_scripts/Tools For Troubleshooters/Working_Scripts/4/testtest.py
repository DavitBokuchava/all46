lp = ""

reg_name = "zestafoni"

soft_switch_39 = {
    "khashuri": "67",
    "telavi": "50",
    "axaltsikhe": "5"
}


soft_switch_95 = {
    "tbilisi": "67",
    "zestafoni": "50",
    "zugdidi": "1"
}




if reg_name in soft_switch_39.keys():
    lp = (soft_switch_39[reg_name])
    print(lp)
    
elif reg_name in soft_switch_95.keys():
    lp = (soft_switch_95[reg_name])
    print(lp)
else:
    print("region error")
