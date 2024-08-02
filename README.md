<div style="padding:10px;">

<img src="src/assets/vectors/cover.svg" style="width:100%; height:500px;">


### About

<p>
Django bolt is a django admin theme built with React using Material-ui
components. The project aims to create a modern administration interface
while maintaining the old django.contrib.admin api.
Django bolt is split into two parts: <a href="https://github.com/demon-bixia/django-bolt">the fronted</a> 
and <a href="https://github.com/demon-bixia/django-api-admin">the backend</a>.
</p>

### Resources

* Logo tutorial and inspiration: <a href="https://www.youtube.com/watch?v=drUsOJQfFZM&ab_channel=LogosByNick">Logos by
  nick</a>
* Icon pack: <a href="https://feathericons.com/">Feather icons</a>
* Components: <a href="https://mui.com/">Material-ui</a>
* Colors And styles: <a href="https://www.figma.com/file/iDvC7g040k6XswfIaX5xzg/Django-bolt-admin?node-id=0%3A1">Bolt design system</a>
* Admin Design: <a href="https://www.figma.com/file/iDvC7g040k6XswfIaX5xzg/Django-bolt-admin?node-id=5%3A54">design </a>
</div>

### Setup

<p>Install django-api-admin package.</p>

```bash
$ pip install django-api-admin
```

<p>In your settings.py make sure you have <b>django.contrib.admin</b>, <b>rest_framework</b>,
<b>cors-headers<b>, and
<b>django_api_admin</b>.</p>

```python
INSTALLED_APPS = [
    # built-in apps
    'django.contrib.admin',
    # 3rd party apps
    'corsheaders',
    'rest_framework',
    'django_api_admin',
]
```

<p>Add cors middileware to your list of middileware. in settings.py</p>

```python
from corsheaders.middleware import CorsMiddleware
MIDDLEWARE = [
    ...
    'corsheaders.middleware.CorsMiddleware',
    ...
]
```

<p>include django-api-admin admin urls.</p>

```python
urlpatterns = [
    path('api_admin/', site.urls),
]
```

<p>Add these CORS and CSRF settings to you settings.py file</p>

```python
# CORS settings
CORS_ORIGIN_WHITELIST = (
    'http://localhost',  # jest-dom test server
    'http://localhost:3000',  # react developement server
)

CORS_ALLOW_CREDENTIALS = True

# to allow cross-domain requests from our frontend
CSRF_TRUSTED_ORIGINS = ['http://localhost:3000']
```

<p>register your models using django_api_admin</p>

```python
from django_api_admin.sites import site
from .models import Author, Book

site.register(Author)
site.register(Book)
```


<p>Now clone or download this repo.</p>

```bash
git clone https://github.com/demon-bixia/django-bolt.git
```

<p>Add your server url to src/application/config.js for example:</p>

```javascript
const config = {
    url: (new URL('http://localhost:8000/api_admin/')),
    siteUrl: (new URL('http://localhost:8000/'))
};
```

<p>Now run your django development server.</p>

```bash
python manage.py runserver
```

<p>And run you react development server.</p>

```bash
yarn run start
```

<br/>

### Features Support

<br/>

<table style="font-family: arial, sans-serif;  border-collapse: collapse;  width: 100%;">
  <tr>
    <th style="border: 1px solid #dddddd;text-align: left;  padding: 8px;">Feature</th>
    <th style="border: 1px solid #dddddd;text-align: left;  padding: 8px;">Django.contrib.admin</th>
    <th style="border: 1px solid #dddddd;text-align: left;  padding: 8px;">Django-bolt</th>
  </tr>
  
  <tr>
    <td style="border: 1px solid #dddddd;text-align: left;  padding: 8px;">inline admins</td>
    <td style="border: 1px solid #dddddd;text-align: left;  padding: 8px;">:heavy_check_mark:</td>
    <td style="border: 1px solid #dddddd;text-align: left;  padding: 8px;">:heavy_multiplication_x:</td>
  </tr>

  <tr>
    <td style="border: 1px solid #dddddd;text-align: left;  padding: 8px;">changelist editing</td>
    <td style="border: 1px solid #dddddd;text-align: left;  padding: 8px;">:heavy_check_mark:</td>
    <td style="border: 1px solid #dddddd;text-align: left;  padding: 8px;">:heavy_multiplication_x:</td>
  </tr>

  <tr>
    <td style="border: 1px solid #dddddd;text-align: left;  padding: 8px;">add/change</td>
    <td style="border: 1px solid #dddddd;text-align: left;  padding: 8px;">:heavy_check_mark:</td>
    <td style="border: 1px solid #dddddd;text-align: left;  padding: 8px;">:heavy_check_mark:</td>
  </tr>

  <tr>
    <td style="border: 1px solid #dddddd;text-align: left;  padding: 8px;">history</td>
    <td style="border: 1px solid #dddddd;text-align: left;  padding: 8px;">:heavy_check_mark:</td>
    <td style="border: 1px solid #dddddd;text-align: left;  padding: 8px;">:heavy_check_mark:</td>
  </tr>

  <tr>
    <td style="border: 1px solid #dddddd;text-align: left;  padding: 8px;">changelist</td>
    <td style="border: 1px solid #dddddd;text-align: left;  padding: 8px;">:heavy_check_mark:</td>
    <td style="border: 1px solid #dddddd;text-align: left;  padding: 8px;">:heavy_check_mark:</td>
  </tr>
</table>
