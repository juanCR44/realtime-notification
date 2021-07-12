FROM openjdk:8
EXPOSE 8091
ADD target/enablenotification.jar enablenotification.jar
RUN sh -c 'touch enablenotification.jar'
ENTRYPOINT ["java","-jar","/enablenotification.jar"]