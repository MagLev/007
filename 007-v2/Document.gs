! ========================================================================
! Copyright (C) by GemStone Systems, Inc. 1986-2002.  All Rights Reserved
! ========================================================================


! Remove existing behavior from Document
doit
Document removeAllMethods.
Document class removeAllMethods.
%
! ------------------- Class methods for Document
category: 'Creation'
classmethod: Document

newForCompPart: compPart compPartId: cpId

  "Create a new document for the given composite part."

  | aDocument |

  aDocument := self new.
  aDocument id: cpId.
  aDocument part: compPart.
  aDocument setTitle.
  aDocument createText.

  (compPart dictObj AllDocuments) add: aDocument.

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
          add: (id asString);
          lf.
  
  numRepeat := 1.
  text := String new.
  numRepeat timesRepeat: [ text add: aString. ].

  "Make the text DocumentSize long."
  text add: (String new: (DocumentSize - text size)).
%
category: 'Updating'
method: Document
id: newValue

   "Modify the value of the instance variable 'id'."
   id := newValue
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
