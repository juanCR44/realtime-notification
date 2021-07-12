FROM openjdk:8
EXPOSE 8089
ADD target/accountbcp.jar accountbcp.jar
RUN sh -c 'touch accountbcp.jar'
ENTRYPOINT ["java","-jar","/accountbcp.jar"]