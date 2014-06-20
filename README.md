# CASA Admin Outlet

The [Community App Sharing Architecture (CASA)](http://imsglobal.github.io/casa) provides a mechanism for
discovering and sharing metadata about web resources such as websites, mobile
apps and LTI tools. It models real-world decision-making through extensible
attributes, filter and transform operations, flexible peering relationships,
etc.

This Javascript application is a supporting component for managing the CASA
reference implementation. It provides an administrative user interface for
the [CASA engine](https://github.com/IMSGlobal/casa-engine); however, it is not actually part of the CASA protocol.

## License

This software is **open-source** and licensed under the Apache 2 license.
The full text of the license may be found in the `LICENSE` file.

## Build

```
bundle install
```

```
npm install
```

```
bower install
```

```
bundle exec blocks build
```

##Run
```
bundle exec rackup -p <port>
```


