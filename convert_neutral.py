from openpyxl import load_workbook
from random import shuffle

import json

def main(filename):
	read_workbook(filename)


def read_workbook(filename):
	wb = load_workbook(filename)
	ws_names = wb.get_sheet_names()
	data = []
	for ws in wb.worksheets:
		data.append(read_worksheet(ws))

	with open("data.js", 'w') as file:
		file.write("data=" + json.dumps(data))


def read_worksheet(worksheet):
	ws = worksheet
	sentiments = ["Negative", "Neutral", "Positive"]
	empty_count = 0

	# print(ws.rows)
	children = []
	child = {
		"sourceType": "Social Media",
		"type": "text",
		"sentiment": "Neutral",
		"children": []

	}

	flag = True
	for row in ws.rows[1:]:
		if row[0].value:
			print(row[0].value)
			child = {
				"sourceType": "Social Media",
				"type": "text",
				"sentiment": "Neutral",
				"children": []
			}
			child['content'] = row[3].value
			children.append(child)
			flag = True
		elif row[4].value:
			child['children'].append({
				"sourceType": "Social Media",
				"type": "text",
				"sentiment": "Neutral",
				"content": row[4].value
			})
		


	shuffle(children)
	return {
		"sourceType": "Social Media",
		"type": "text",
		"sentiment": "Neutral",
		"children": children,
		"content": ws.title,
	}

if __name__ == "__main__":
	import sys
	main(sys.argv[1])