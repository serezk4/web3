package com.serezk4.managment;

import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Named;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;

/**
 * Bean for getting point coordinates and checking if it is in the area
 *
 * @author serezk4
 * @version 1.0
 * @since 1.0
 */

@Named
@SessionScoped
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AttemptBean implements Serializable {
    double x = 0;
    double y = 0;
    double r = 0;
    boolean result;

    public double getX() {return x;}
    public double getY() {return y;}
    public double getR() {return r;}

    public void setX(double x) {this.x = x;}
    public void setY(double y) {this.y = y;}
    public void setR(double r) {this.r = r;}
    public boolean isResult() {return result;}

    public String checkPoint() {
        result = (x >= 0 && y >= 0 && x <= r && y <= r);
        return "app.xhtml";
    }
}
