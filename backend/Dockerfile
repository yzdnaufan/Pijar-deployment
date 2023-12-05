FROM python:3.11

WORKDIR /app
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt 
    
COPY . /app

CMD ["gunicorn", "main:app", "-b", "0.0.0.0:15400", "-k", "uvicorn.workers.UvicornWorker", "-w", "12", "--timeout", "60"]
# RUN npm run build
