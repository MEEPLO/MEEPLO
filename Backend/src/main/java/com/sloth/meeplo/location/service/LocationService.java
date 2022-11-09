package com.sloth.meeplo.location.service;

import com.sloth.meeplo.location.dto.response.LocationResponse;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface LocationService {

    List<LocationResponse.pointNearLocation> getNearLocation(Double lat, Double lng, Double radius);
}
