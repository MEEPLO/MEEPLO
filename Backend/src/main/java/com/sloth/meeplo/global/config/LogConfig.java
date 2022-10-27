package com.sloth.meeplo.global.config;

import com.google.common.base.Joiner;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.CodeSignature;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Component
@Aspect
public class LogConfig {

    @Around("within(com.sloth.meeplo..controller..*)) && @target()") // ex. within(me.shinsunyoung.demo..*)) 1
    public Object logging(ProceedingJoinPoint pjp) throws Throwable { // 2

        String params = getRequestParams(pjp); // request 값 가져오기

        long startAt = System.currentTimeMillis();

        log.info("-----------> REQUEST : {}({}) <= {}", getControllerName(pjp.getSignature().getDeclaringTypeName()),
                pjp.getSignature().getName(), params);

        Object result = pjp.proceed(); // 4
        long endAt = System.currentTimeMillis();

        log.info("-----------> RESPONSE : {}({}) => {} ({}ms)", getControllerName(pjp.getSignature().getDeclaringTypeName()),
                pjp.getSignature().getName(), result, endAt - startAt);

        return result;
    }


    private String paramMapToString(Map<String, String[]> paramMap) {
        return paramMap.entrySet().stream()
                .map(entry -> String.format("%s -> (%s)",
                        entry.getKey(), Joiner.on(",").join(entry.getValue())))
                .collect(Collectors.joining(", "));
    }

    // Get request values
    private String getControllerName(String declaringTypeName){
        return declaringTypeName.split("[.]")[(int)declaringTypeName.chars().filter(c->c=='.').count()];
    }
    private String getRequestParams(JoinPoint pjp) {

        CodeSignature signature = (CodeSignature) pjp.getSignature();
        String[] paramsName = signature.getParameterNames();
        Object[] args = pjp.getArgs();

        if(paramsName.length==0) return "None";

        StringBuilder sb = new StringBuilder();
        sb.append("[");
        for (int i = 0; i <paramsName.length; i++) {
            sb.append(paramsName[i]).append(" : ").append(args[i]);
            if(i!=paramsName.length-1){
                sb.append(", ");
            }
        }
        sb.append("]");
        return  sb.toString();
    }
}
