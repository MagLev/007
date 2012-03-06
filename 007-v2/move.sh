# 
nohup

setenv GEMSTONE $1
set path = ($path $GEMSTONE/bin)

set totalNumUsers = $2

topaz -l << eof
output push log/move$$.out
login
run
  ^RunBench moveUsersToShared: $totalNumUsers
%
logout
output pop
exit
eof
