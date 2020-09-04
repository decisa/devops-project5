until yarn db:migrate > /dev/null 2>&1;
do 
    echo "no DB server found. waiting 5 seconds ... ";
    sleep 3; 
done

echo "DB server is now available. Starting Migration and API service ..."
yarn seed-start