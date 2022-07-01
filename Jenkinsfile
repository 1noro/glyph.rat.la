// node {
//     stage('SCM') {
//         checkout scm
//     }
//     stage('SonarQube Analysis') {
//         def scannerHome = tool 'SonarScanner';
//         withSonarQubeEnv('SonarQube') {
//             sh "${scannerHome}/bin/sonar-scanner"
//         }
//     }
// }

pipeline {
    agent any
    options {
        buildDiscarder(logRotator(numToKeepStr: '5'))
        disableConcurrentBuilds()
        /*timeout(time: 300, unit: "SECONDS")*/
    }
    stages {
        stage('Print env') {
            steps {
                sh 'printenv'
            }
        }
        stage('Build') {
            steps {
                sh 'make docker-setup'
            }
        }  
        stage('Test') {
            steps {
                sh 'make docker-test'
            }
        }
    }
}
