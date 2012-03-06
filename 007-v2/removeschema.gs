! ========================================================================
! Copyright (C) by GemStone Systems, Inc. 1986-2002.  All Rights Reserved
! ========================================================================
run
| symList schemaAssoc |
schemaAssoc := System myUserProfile resolveSymbol: #OO7Schema .
schemaAssoc notNil ifTrue:[
  symList := System myUserProfile symbolList .
  symList deleteObjectAt: (symList indexOf: schemaAssoc value ) .
  UserGlobals removeKey: #OO7Schema ifAbsent: [].
  ^ 'removed'
  ].
^ 'not found'
%

