pipeline {
    agent { 
        docker { 
            image 'node:10-alpine' 
        } 
        
    }
    
    stages {
        stage('Clone GIT repo') {
            steps {
            	checkout scm
            }
        }
        
        stage('NPM install') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        
        stage('Compress') {
            steps {
                sh 'mkdir -p ipa-api-package/build'
                sh 'cp -r build/* ipa-api-package/build/'
                sh 'cp server.js ipa-api-package/'
                zip zipFile: 'ipa-api.zip', archive: true, dir: 'ipa-api-package'
            }
        }

    }
    post {
        always {
            cleanWs()
        }
    }
}

