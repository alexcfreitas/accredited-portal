FROM registry.redhat.io/ubi8/nodejs-14

USER root 

WORKDIR /app                                                                                                                                                                                    

ADD  . .       

EXPOSE 3000   

RUN yum install wget -y

RUN wget https://download.oracle.com/otn_software/linux/instantclient/211000/oracle-instantclient-basic-21.1.0.0.0-1.x86_64.rpm --no-check-certificate

RUN yum install oracle-instantclient-basic-21.1.0.0.0-1.x86_64.rpm -y

RUN npm install 

RUN npm run build

CMD npm run start:prod  