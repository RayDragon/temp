import xml.etree.ElementTree as ET

score = 0
try:
  tree = ET.parse('angular/unit.xml')
  tests = int(tree.getroot().get('tests'))
  errors = int(tree.getroot().get('errors'))
  failures = int(tree.getroot().get('failures'))
  score+= (tests-(errors+failures))/(tests/70)
except:
  score

try:
  tree = ET.parse('django/unit.xml')
  tests = int(tree.getroot().get('tests'))
  errors = int(tree.getroot().get('errors'))
  failures = int(tree.getroot().get('failures'))
  score+= (tests-(errors+failures))/(tests/30)
except:
  score

print("FS_SCORE:"+str(score)+"%")
