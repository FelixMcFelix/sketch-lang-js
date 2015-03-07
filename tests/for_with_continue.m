forWithContinue(){
	for(num n = 0; n<5; n++){
		n++;
		if(n ?= 3){
			n = 5;
			continue;
		}
		n = 2;
	}
	print(n);

}
