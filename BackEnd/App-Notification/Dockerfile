FROM openjdk:8
EXPOSE 8090
ADD target/appnotification.jar appnotification.jar
RUN sh -c 'touch appnotification.jar'
ENTRYPOINT ["java","-jar","/appnotification.jar"]