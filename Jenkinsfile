pipeline {
  agent any
  stages {
    stage('Development') {
      parallel {
        stage('Development') {
          steps {
            echo 'Test Pipeline !'
            if (fileExists('docker-compose.yml')) {
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