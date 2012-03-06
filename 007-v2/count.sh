#
nohup

if ($#argv != 2) then
  echo 'Usage: count.sh $GEMSTONE sampleTime'
  exit 1
endif

setenv GEMSTONE $1
set path = ($path $GEMSTONE/bin)

set sampleTime = $2

topaz -l << eof
output push log/count$$.out
login
run
  ^RunBench countSamplingEvery: $sampleTime
%
commit
logout
output pop
exit
eof
