#!/usr/bin/env bash
TAG_NAME=${1:-"Jenkins-P5"}
ID=$(aws ec2 describe-instances \
    --filter "Name=tag:Name,Values=$TAG_NAME" \
    --query 'Reservations[*].Instances[*].[InstanceId]' \
    --output text)

if [ -z $ID ]
then
    echo "Instance ID with Name=\"$TAG_NAME\" was not found."
    exit
else
    echo "found instance ID !"
fi

STATE=$(aws ec2 describe-instances \
    --instance-id $ID \
    --query 'Reservations[*].Instances[*].[State.Name]' \
    --output text)

if [ $STATE = "running" ]
then
    echo "Instance is running, stopping now!"
    aws ec2 stop-instances --instance-ids $ID
    STATE="stopping"
    while [ $STATE = "stopping" ]
    do 
        echo "instance state is \"$STATE\". waiting 5 seconds ... "
        sleep 5
        STATE=$(aws ec2 describe-instances \
            --instance-id $ID \
            --query 'Reservations[*].Instances[*].[State.Name]' \
            --output text) 
    done
    echo "instance \"$TAG_NAME\" state is now: \"$STATE\"."
else if [ $STATE = "stopped" ]
then
    echo "Instance is already stopped ! :)"
else
    echo "Instance is in \"$STATE\" state. Doing nothing"
    exit
fi
fi

# IP=$(aws ec2 describe-instances \
#     --instance-id $ID \
#     --query 'Reservations[*].Instances[*].[PublicIpAddress]' \
#     --output text)

# echo " "
# echo "------------------------------------"
# echo "Jenkins console found here:"
# echo "http://$IP:8080/"
# echo "------------------------------------"

# --query 'Reservations[*].Instances[*].{id:InstanceId, status:State.Name, tag:Tags[?Key==`Name`].Value}' \