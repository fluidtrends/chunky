package <%= chunky.id %>;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

  @Override
  protected String getMainComponentName() {
    return "<%= chunky.id %>";
  }
}
