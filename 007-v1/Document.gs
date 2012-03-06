! ========================================================================
! Copyright (C) by GemStone Systems, Inc. 1986-2002.  All Rights Reserved
!
! Name - Document.gs
! Description: Defines instance and class methods for class Document
!
! ========================================================================
input util/resultcheck.tpz
omit oops

level 0

! ------------------- Class methods for Document
category: 'Constructor'
classmethod: Document

newForCompPart: cp compPartId: cpId

  "Create a new document for the given composite part."

  | aDocument |

  aDocument := self new.
  aDocument id: cpId.
  aDocument part: cp.
  aDocument initialize.

  AllDocuments add: aDocument.

  ^aDocument.
%
! ------------------- Instance methods for Document
category: 'Initialization'
method: Document

createText

  "Prepare and fill in the document text."

  | aString numRepeat |
  
  aString := String new.
  aString add: 'I am the documentation for composite part #';
   add: (id asString).
  
  numRepeat := DocumentSize // (aString size).
  text := String new.
  numRepeat timesRepeat: [ text add: aString. ].

  1 to: (DocumentSize - text size) do: [ :i |
    text add: (aString at: i)
    ].
%
category: 'Accessing'
method: Document
id

   "Return the value of the instance variable 'id'."
   ^id
%
category: 'Updating'
method: Document
id: newValue

   "Modify the value of the instance variable 'id'."
   id := newValue
%
category: 'Initialization'
method: Document
initialize
  "comment - what does this method do?"

  | temps |

  "prepare and fill in the document title."
  title := String new.
  title add: 'Composite Part ';
   add: (id asString).

  self createText.

%
category: 'Accessing'
method: Document
part

   "Return the value of the instance variable 'part'."
   ^part
%
category: 'Updating'
method: Document
part: newValue

   "Modify the value of the instance variable 'part'."
   part := newValue
%
category: 'Initialization'
method: Document

setTitle

  "Set the title."

  title := String new.
  title add: 'Composite Part ';
   add: (id asString).
 
%
category: 'Accessing'
method: Document
text

   "Return the value of the instance variable 'text'."
   ^text
%
category: 'Updating'
method: Document
text: newValue

   "Modify the value of the instance variable 'text'."
   text := newValue
%
category: 'Accessing'
method: Document
title

   "Return the value of the instance variable 'title'."
   ^title
%
category: 'Updating'
method: Document
title: newValue

   "Modify the value of the instance variable 'title'."
   title := newValue
%
