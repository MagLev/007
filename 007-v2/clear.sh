#
# clear the raw partitions and copy the initial dbf

nohup
if ($#argv != 1) then
  echo 'Usage: clear.sh $GEMSTONE'
  exit 1
endif

setenv GEMSTONE $1
set path = ($path $GEMSTONE/bin)

#tranlogs
removedbf /dev/rdsk/c0t1d0s3
removedbf /dev/rdsk/c0t1d0s4


#extents
removedbf /dev/rdsk/c0t3d0s7


copydbf  $GEMSTONE/data/extent0.dbf /dev/rdsk/c0t3d0s7
