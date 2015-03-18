Point pt1 = {1,1}
Point pt2 = {5,2}
Line l = pt1 + pt2;

function shapeWithParams(Line l1) -> Polygon{
		Polygon triangle = l1 * 3;
		draw(triangle);
	}

	shapeWithParams(l);
