DROP TABLE markers;

CREATE TABLE markers (
    city text,
    placeName text,
    placeDescription text,
    submittedBy text,
    lat DOUBLE PRECISION,
    lng DOUBLE PRECISION,
    icon text,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- MOCKUP DATA
INSERT INTO markers VALUES('Test', 'Whittard Cafe', 'Find teapots and tea samples! Also hot chocolate', '@jonbesga', 51.523840, -0.046921, 'milk_and_cookies.png');

INSERT INTO markers VALUES('Test', 'Honestbrew', 'Beers samples', '@txomon', 51.5308886, -0.08716979999996965, 'liquor.png');