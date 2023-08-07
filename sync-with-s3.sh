echo $1

LOCAL=build/
DESTINATION=
npm install
if [[ $1 == prod ]]
then
  echo "You are running in prod"
  echo "\033[31mRUNNING OVER PROD\033[0m"
  read -n 1 -p "Are you sure you want to Sync with PROD [y/n]:" yn
  if [ "$yn" = "y" ];
  then
    npm run build:production
    DESTINATION=s3://cac-prod-game-origin/build/
  else
    echo
    echo "Build and sync cancelled"
    exit;
  fi

elif [[ $1 == test ]]
then
  echo "You are running in test"
  npm run build:test
  DESTINATION=s3://cac-test-game-origin/build/
else
  echo "No environment selected"
  exit
fi

echo "running aws  s3sync"
aws s3 sync $LOCAL $DESTINATION

echo " finished aws s3 sync"

