#!/bin/bash

S3BUCKET_URI=s3://iothack2016/

# we are going to ASSume a shitload of stuff.
# like you have your aws account configured
if test -z "${AWS_ACCESS_KEY_ID}" ; then
  echo "AWS credentials not set."
  exit 132
fi

if test -z "${AWS_SECRET_ACCESS_KEY}" ; then
  echo "AWS credentials not set."
  exit 132
fi

SCRIPT=`basename $0`
DATIM=`date +%Y%m%d%H%M%S`

TMP_FILE=/tmp/${SCRIPT}_${DATIM}_image.jpg

echo "Getting Image"
raspistill -o ${TMP_FILE}
PIC_STATUS=$?

if test "${PIC_STATUS}" -ne 0 ; then
  echo "error taking picture, raspstill returned '${PIC_STATUS}'"
  exit 130
fi

echo "Uploading Image"
aws s3 cp ${TMP_FILE} s3://iothack2016/ 
S3_STATUS=$?

if test "${S3_STATUS}" -ne 0 ; then
  echo "error taking picture, aws s3 returned '${S3_STATUS}'"
  exit 131
fi

exit 0

