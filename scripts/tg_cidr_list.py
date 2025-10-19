import requests

url = "https://core.telegram.org/resources/cidr.txt"
response = requests.get(url)
cidrs = response.text.strip().split("\n")

rules = []
for line in cidrs:
    if ":" in line:
        rules.append(f"IP-CIDR6,{line}")
    else:
        rules.append(f"IP-CIDR,{line}")

with open("rules/tg.list", "w") as f:
    f.write("\n".join(rules))

print("✅ Surge CIDR list generated: tg.list")
