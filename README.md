wayback-import
=================

## UX

1. form to enter a "working" wayback machine link

2. on submit, server makes a get call to that link and parses the returned code
  - return all code between <body> and </body> tags as HTML import code
  - get all stylesheet urls that include web/ and .css
  
3. for each stylesheet, server makes a call to it and returns all the code

4. user remixes the import starter app

5. user pastes returned html into index.html

6. user pastes returned css into style.css

7. TODO: handling broken images

## toolbar cases

1. /examples/fc1.html
  * start: <!-- BEGIN WAYBACK TOOLBAR INSERT -->
  * end: <!-- END WAYBACK TOOLBAR INSERT -->
  * images relative to https://web.archive.org/
  * bunch of analytics junk between <head> and <title>
  
2. /examples/fc2.html
  * stylesheets relative to https://web.archive.org/


\ ゜o゜)ノ
