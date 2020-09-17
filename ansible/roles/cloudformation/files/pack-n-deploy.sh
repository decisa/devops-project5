#!/usr/bin/env bash
aws cloudformation package \
    --template-file eks-root.yml \
    --output-template /tmp/packed-eks-stacks.yml \
    --s3-bucket decisa-eks-cf

stack_name=${1:-"capstone-dev"}

echo "Stack name: $stack_name."

aws cloudformation deploy \
    --template-file /tmp/packed-eks-stacks.yml \
    --stack-name $stack_name