package com.sloth.meeplo.recommendation.algorithm;

import com.sloth.meeplo.recommendation.dto.response.MiddlePointResponse;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

@Component
public class GrahamScan {

    public List<MiddlePointResponse.RouteCoordinate> calcConvexHullPoints(List<MiddlePointResponse.RouteCoordinate> points) {
        MiddlePointResponse.RouteCoordinate root = MiddlePointResponse.RouteCoordinate.builder()
                .lat(Double.MAX_VALUE)
                .lng(Double.MAX_VALUE)
                .build();

        // find root
        for(int i=0;i<points.size();i++) {
            if(points.get(i).getLng() < root.getLng()) {
                root = points.get(i);
            } else if(points.get(i).getLng() == root.getLng()) {
                if(points.get(i).getLat() < root.getLat())
                    root = points.get(i);
            }
        }

        // sort all points to counter clock wise
        MiddlePointResponse.RouteCoordinate finalRoot = root;

        points.sort((c1, c2) -> {
            int result = checkCCW(finalRoot, c1, c2);

            if(result > 0)
                return -1;

            if(result < 0)
                return 1;

            double distance1 = dist(finalRoot, c1);
            double distance2 = dist(finalRoot, c2);

            if(distance1 > distance2)
                return 1;

            return -1;
        });

        Stack<MiddlePointResponse.RouteCoordinate> stack = new Stack<>();
        stack.add(finalRoot);

        for(int i=1;i<points.size();i++) {
            while (stack.size() > 1 && (checkCCW(stack.get(stack.size() - 2), stack.get(stack.size() - 1), points.get(i)) <= 0)) {
                stack.pop();
            }
            stack.add(points.get(i));
        }

        return new ArrayList<>(stack);
    }



    private int checkCCW(MiddlePointResponse.RouteCoordinate c1, MiddlePointResponse.RouteCoordinate c2,
                         MiddlePointResponse.RouteCoordinate c3) {

        double result = ((c1.getLat() * c2.getLng()) + (c2.getLat() * c3.getLng()) + (c3.getLat() * c1.getLng()))
                            - ((c2.getLat() * c1.getLng()) + (c3.getLat() * c2.getLng()) + (c1.getLat() * c3.getLng()));

        if(result == 0)
            return 0;

        return result < 0 ? -1 : 1;
    }

    private double dist(MiddlePointResponse.RouteCoordinate c1, MiddlePointResponse.RouteCoordinate c2) {
        return (c2.getLat() - c1.getLat()) * (c2.getLat() - c1.getLat())
                + (c2.getLng() - c1.getLng()) * (c2.getLng() - c1.getLng());
    }

}
