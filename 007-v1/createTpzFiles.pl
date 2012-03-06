#!/usr/bin/perl
#========================================================================
# Copyright (C) GemStone Systems, Inc. 1986-2002.  All Rights Reserved.
# Name - createTpzFiles.pl
# Description:  Creates subroutines for oo7 Benchmark tests
#========================================================================

#####################################################################
# subroutines to create configoo7.tpz file and query and traversal
# files.

# importenv is part of the Perl library.
# It defines a Perl variable for every environment variable.
require "importenv.pl";

sub createConfig {

  unless (open(CONF, ">$resultdir/input/configoo7.tpz") ) {
    die "Sorry, couldn't create file $resultdir/input/configoo7.tpz\n";
  }
  print CONF "input util/resultcheck.tpz\n\n";
  print CONF "omit oops\n";
  print CONF "login\n";
  print CONF "output push $resultdir/logDir/configoo7.out\n";
  print CONF "expectvalue %SmallInteger\n";
  print CONF "run\n";
  print CONF "UserGlobals at: #NumAssmPerAssm   put: 3;\n";
  print CONF "            at: #NumCompPerAssm   put: 3;\n";
  print CONF "            at: #NumCompPerModule put: 500;\n";
  print CONF "            at: #NumAssmLevels    put: 7;\n";
  print CONF "            at: #TotalModules     put: 1;\n";
  print CONF "            at: #NumConnPerAtomic put: $extraDir2;\n";
  print CONF "            at: #CacheSize        put: 1500.\n";
  print CONF "%\n";
  print CONF "expectvalue true\n";
  print CONF "run\n";
  if ($extraDir == 1) {
     print CONF "UserGlobals at: #NumAtomicPerComp put: 20;\n";
     print CONF "            at: #DocumentSize     put: 2000;\n";
     print CONF "            at: #ManualSize       put: 100000.\n";
     print CONF "UserGlobals at: #purge put: false.\n";
  } else {
  print CONF "UserGlobals at: #NumAtomicPerComp put: 200;\n";
     print CONF "            at: #DocumentSize     put: 20000;\n";
     print CONF "            at: #ManualSize       put: 1000000.\n";
     print CONF "UserGlobals at: #purge put: true.\n";
  }
  print CONF "^true\n";
  print CONF "%\n\n";
  print CONF "commit\n";
  print CONF "output pop\n";
  print CONF "logout\n";
  print CONF "! -----------------------------------------------------------------------\n";
     
  close(CONF);

}

sub createQuery {
   unless (open(QUERY, ">$resultdir/input/query$queryType.tpz") ) {
      die "Sorry, couldn't create $resultdir/input/query$queryType.tpz\n";
   }
   print QUERY "login\n";
   print QUERY "input util/resultcheck.tpz\n\n";
   print QUERY "omit oops\n";
   print QUERY "output push $resultdir/logDir/query$queryType.out only\n";
   print QUERY "expectvalue %Array\n";
   print QUERY "run\n";
   print QUERY '  "Put the results returned by invoking runQueries in UserGlobals."
';
   print QUERY "UserGlobals at: $queryType put:\n";
   print QUERY "    (Bench runQueries: $queryType repeatCount: $repeatCount).\n";
   print QUERY "%\n";
   print QUERY "expectvalue true\n";
   print QUERY "run\n";
   print QUERY "| temp |\n";
   print QUERY "temp := Bench expectvalueForQuery: $queryType.\n";
   print QUERY "(temp = (((UserGlobals at: $queryType) at: 1) at: 2)) ifFalse: [^'wrong result' ].\n";
   print QUERY "^true\n";
   print QUERY "%\n\n";
   print QUERY "omit resultcheck\n";
   print QUERY "iferror\n";
   print QUERY "input util/ensureGcRunning.gs\n";
   print QUERY "run\n";
   print QUERY "System commitTransaction.\n";
   print QUERY "SystemRepository objectAudit.\n";
   print QUERY "%\n\n";
   print QUERY "commit\n";
   print QUERY "output pop\n";
   print QUERY "logout\n";
   close(QUERY);
}


sub createTraverse {
   unless (open(TRAV, ">$resultdir/input/traverse$traverseType.tpz") ) {
      die "Sorry, couldn't create $resultdir/input/traverse$traverseType.tpz\n";
   }
   print TRAV "login\n";
   print TRAV "input util/resultcheck.tpz\n\n";
   print TRAV "omit oops\n";
   print TRAV "output push $resultdir/logDir/traverse$traverseType.out only\n";
   print TRAV "expectvalue %Array\n";
   print TRAV "run\n";
   print TRAV '  "Put the results returned by invoking runTraversal in UserGlobals."
';
   print TRAV "UserGlobals at: $traverseType put:\n";
   print TRAV "    (Bench runTraversal: $traverseType repeatCount: $repeatCount).\n";
   print TRAV "%\n";
   print TRAV "expectvalue true\n";
   print TRAV "run\n";
   print TRAV "| temp |\n";
   print TRAV "temp := Bench expectvalueForTraversal: $traverseType.\n";
   print TRAV "(temp = (((UserGlobals at: $traverseType) at: 1) at: 2)) ifFalse: [^'wrong result' ].\n";
   print TRAV "^true\n";
   print TRAV "%\n\n";
   print TRAV "omit resultcheck\n";
   print TRAV "iferror\n";
   print TRAV "input util/ensureGcRunning.gs\n";
   print TRAV "run\n";
   print TRAV "System commitTransaction.\n";
   print TRAV "SystemRepository objectAudit.\n";
   print TRAV "%\n\n";
   print TRAV "commit\n";
   print TRAV "output pop\n";
   print TRAV "logout\n";
   close(TRAV);
}

sub createPrintFile {
   unless (open(OUT, ">$resultdir/input/printResults.tpz") ) {
      die "Sorry, couldn't create $resultdir/input/printResults.tpz\n";
   }
   print OUT "login\n";
   print OUT "output push $resultdir/logDir/printResults.out only\n";
   print OUT "run\n";
   print OUT "Bench printResults: '$resultFile' header: '$mesg'\n";
   print OUT "%\n";
   print OUT "run\n";
   print OUT "Bench printLog: '$logFile' header: '$mesg'\n";
   print OUT "%\n\n";
   print OUT "output pop\n";
   print OUT "logout\n";
   close(OUT);
}

sub createOutFile {
   unless (open(OUT, ">$resultdir/input/printOutFile.tpz") ) {
      die "Sorry, couldn't create $resultdir/input/printOutFile.tpz\n";
   }
   print OUT "login\n";
   print OUT "output push $resultdir/logDir/printOutFile.out only\n";
   print OUT "run\n";
   print OUT "Bench printOutFile: '$outFile' header: '$mesg'\n";
   print OUT "%\n\n";
   print OUT "output pop\n";
   print OUT "logout\n";
   close(OUT);
}

