! ========================================================================
! Copyright (C) by GemStone Systems, Inc. 1986-2002.  All Rights Reserved
!
! $Id: loadOO7dc.gs 19162 2008-06-03 20:59:32Z stever $
!
! ========================================================================

#
# load the OO7 benchmark schema (DataCurator component)
#
#     assume that the topaz has already been started
#
#     must have the following environment variables defined:
#        OO7sourcedir       the location of the OO7 sources
#        OO7rundir          where the test is being run from
#        OO7configfile      path to the configuration file
#                             /full/path/to/config<something>.gs
#
output push loadOO7dc.out only
omit resultcheck
level 0

# Set up a schema dictionary
run
| myUserProfile |
myUserProfile := System myUserProfile .
(myUserProfile resolveSymbol: #OO7Schema) == nil ifTrue:[
  "myUserProfile symbolList add: (myUserProfile createDictionary:#OO7Schema)"
  System myUserProfile symbolList createDictionaryNamed: #OO7Schema at: 1.
  GsSession currentSession symbolList replaceElementsFrom:
    System myUserProfile symbolList.
  ].
^ true
%
# obj OO7Schema
# pausefordebug

#Empty configuration
input $OO7sourcedir/configempty.gs

# The schema
input $OO7sourcedir/OO7schema.gs
input $OO7sourcedir/SharedModule.gs

# General parameters 
input $OO7sourcedir/genparams.gs
input $OO7sourcedir/runparamsempty.gs

#Random number generator generator
input $OO7sourcedir/Random.gs

#Random number generators
#input $OO7sourcedir/randgen.gs

#Sequential Id generators
input $OO7sourcedir/idGenerator.gs

# Class Module
input $OO7sourcedir/Module.gs
input $OO7sourcedir/TrivialModule.gs

# Class Manual
input $OO7sourcedir/Manual.gs

# Class Assembly
# Class ComplexAssembly
# Class BaseAssembly
input $OO7sourcedir/Assembly.gs
input $OO7sourcedir/ComplexAssembly.gs
input $OO7sourcedir/BaseAssembly.gs

# Class AtomicPart
input $OO7sourcedir/AtomicPart.gs

# Class CompositePart
input $OO7sourcedir/CompositePart.gs

# Class Connection
input $OO7sourcedir/Connection.gs

# Class DesignObj
input $OO7sourcedir/DesignObj.gs

# Class Document
input $OO7sourcedir/Document.gs

# Class OO7Benchmark
input $OO7sourcedir/OO7Benchmark.gs
# Class RunBench
input $OO7sourcedir/RunBench.gs

! default configuration 10 users and "Small3" parameters
input $OO7sourcedir/config10userSmall3.gs

commit

output pop
display resultcheck
