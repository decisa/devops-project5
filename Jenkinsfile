pipeline {
  agent any
  stages {
    stage('Development') {
      parallel {
        stage('Development') {
          steps {
            echo 'Test Pipeline !'
            def dockerComposeExists = fileExists 'docker-compose.yml'
            if (dockerComposeExists) {
                echo "docker compose file found"
            } else {
                echo "!!! docker compose file NOT found !!!"
            }

          }
        }

        stage('stage A') {
          steps {
            echo 'Hello from Stage A'
          }
        }

      }
    }

  }
}