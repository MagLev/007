! ========================================================================
! Copyright (C) by GemStone Systems, Inc. 1986-2002.  All Rights Reserved
!
! Name - Manual.gs
! Description: Defines instance and class methods for class Manual
!
! ========================================================================

input util/resultcheck.tpz
omit oops

level 0
! Remove existing behavior from Manual
expectvalue %Metaclass
run
Manual removeAllMethods.
Manual class removeAllMethods.
%
! ------------------- Class methods for Manual
category: 'Constructor'
classmethod: Manual

  newWithModuleId: modId module: myModule

  "Manual Constructor."

  | aManual |

  aManual := self new.
  aManual id: modId.
  aManual mod: myModule.

  aManual Initialize.

  ^aManual.
%
! ------------------- Instance methods for Manual
category: 'Initialization'
method: Manual

Initialize

  "Initialize the Manual object with the title and text strings"

  | aString numRepeat |

  "prepare and fill in the document title"
  title := String new.
  title add: 'Manual '; 
   add: (id asString).

  "Make the title TitleSize long."
  title add: (String new: (TitleSize - title size)).


  "prepare and fill in the document text"
  aString := String new.
  aString add: 'I am the manual for module #';
   add: (id asString).

  numRepeat := ManualSize // (aString size).
  text := String new.
  numRepeat timesRepeat: [ text add: aString. ].

  1 to: (ManualSize - text size) do: [ :i |
    text add: (aString at: i)
    ].

  textLen := text size.
%
category: 'Searching'
method: Manual
firstLast
  "checks if the first and last characters are the same"

   (text at: 1) = (text at: textLen)
      ifTrue: [ ^ 1 ]
      ifFalse: [ ^ 0 ]
%
category: 'Accessing'
method: Manual
id

   "Return the value of the instance variable 'id'."
   ^id
%
category: 'Updating'
method: Manual
id: newValue

   "Modify the value of the instance variable 'id'."
   id := newValue
%
category: 'Accessing'
method: Manual
mod

   "Return the value of the instance variable 'mod'."
   ^mod
%
category: 'Updating'
method: Manual
mod: newValue

   "Modify the value of the instance variable 'mod'."
   mod := newValue
%
category: 'Searching'
method: Manual
searchText: char
  "search the text for the number of occurences of a particular character"

  | index count foundIndex |

  index := 1.
  count := 0.
  [index <= textLen] whileTrue: [
     foundIndex := text indexOf: char startingAt: index.
     foundIndex > 0
         ifTrue: [count := count + 1.
                  index := foundIndex + 1]
         ifFalse: [^ count].
     ].
   ^ count.
%
category: 'Accessing'
method: Manual
text

   "Return the value of the instance variable 'text'."
   ^text
%
category: 'Updating'
method: Manual
text: newValue

   "Modify the value of the instance variable 'text'."
   text := newValue
%
category: 'Accessing'
method: Manual
textLen

   "Return the value of the instance variable 'textLen'."
   ^textLen
%
category: 'Updating'
method: Manual
textLen: newValue

   "Modify the value of the instance variable 'textLen'."
   textLen := newValue
%
category: 'Accessing'
method: Manual
title

   "Return the value of the instance variable 'title'."
   ^title
%
category: 'Updating'
method: Manual
title: newValue

   "Modify the value of the instance variable 'title'."
   title := newValue
%
