# 
nohup

setenv GEMSTONE $1
set path = ($path $GEMSTONE/bin)

topaz -l << eof &
output push log/runtest$$.out
login
run
  ^RunBench runUser
%
logout
output pop
exit
eof

end

exit 0
