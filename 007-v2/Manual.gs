! ========================================================================
! Copyright (C) by GemStone Systems, Inc. 1986-2002.  All Rights Reserved
! ========================================================================


! Remove existing behavior from Manual
doit
Manual removeAllMethods.
Manual class removeAllMethods.
%
! ------------------- Class methods for Manual
category: 'Creation'
classmethod: Manual

  newWithModuleId: modId module: myMod

  "Create a new manual object with the give modId and for the given
   module"

  | aManual |

  aManual := self new.
  aManual id: modId.
  aManual mod: myMod.

  aManual Initialize.

  ^aManual.
%
! ------------------- Instance methods for Manual
category: 'Initialization'
method: Manual

Initialize

  "Initialize the Manual object with the title and text strings"

  | aString numRepeat |

  
  title := String new.
  title add: 'Manual ';
	add: (id asString).

  "Make the title TitleSize long."
  title add: (String new: (TitleSize - title size)).

  aString := String new.
  aString add: 'I am the manual for module #';
          add: (id asString);
          lf.

  numRepeat := 1.
  text := String new.
  numRepeat timesRepeat: [ text add: aString. ].

  "Make the text ManualSize long."
  text add: (String new: (ManualSize - text size)).
  
  textLen := aString size.
%
category: 'Searching'
method: Manual
firstLast
  "Checks if the first and last characters are the same"


  ^ ((text at: 1) = (text last))
%
category: 'Updating'
method: Manual
id: newValue

   "Modify the value of the instance variable 'id'."
   id := newValue
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

  "Manual searchText Method for use in traversals"

  | index count |

  index := 1.
  count := 0.
  [index < ManualSize] whileTrue: 
    [index := text indexOf: char startingAt: index.
      (index > 0)
        ifTrue: [count := count + 1.
                 index := index + 1 ]
        ifFalse: [^count]
    ].
   ^count.
%
