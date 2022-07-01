pipeline {
    agent { docker { image 'node:16' } }
    options {
        buildDiscarder(logRotator(numToKeepStr: '5'))
        disableConcurrentBuilds()
        /*timeout(time: 300, unit: "SECONDS")*/
    }
    stages {
        /*stage('Print env') {*/
            /*steps {*/
                /*sh 'printenv'*/
            /*}*/
        /*}*/
        stage('Install') {
            steps {
                sh 'yarn install'
            }
        }  
        stage('Test') {
            steps {
                sh 'yarn test'
            }
        }
    }
}
