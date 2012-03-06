# 

nohup

setenv GEMSTONE $1
set path = ($path $GEMSTONE/bin)

topaz -l << eof

output push log/build$$.out
set user DataCurator pass swordfish
login
run
   ^RunBench buildOneModule
%
logout
output pop
exit
eof
