main(){
	givesOutput(num n, String s) -> String{
		n++
		s = "world"
		return(s);
	}
	String s = givesOutput(4, "hello");
	print(s);


}
