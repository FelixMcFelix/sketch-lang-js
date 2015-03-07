main(){
	shapeWithParams(Point p1, Point p2) -> Polygon{
		Polygon triangle = (p1 + p2) * 3;
		draw(triangle)
	}
	shapeWithParams({1,1}, {6,6});
}
